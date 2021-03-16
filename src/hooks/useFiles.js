import { useEffect, useRef, useState } from "react";

import useConfig from "./useConfig";

const useFiles = ({ s3, username }) => {
  const { albumBucketName, uploadPath, retrievePath } = useConfig().s3;
  const { isFileExplorerEnabled } = useConfig().app;
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState([]);
  const [pendingFileUploads, setPendingFileUploads] = useState(null);
  const [fileUploadErrors, setFileUploadErrors] = useState([]);
  const [shouldGetObjects, setShouldGetObjects] = useState(false);
  const uploadStartTime = useRef(null);

  const userUploadPath = uploadPath + username + "/";
  const userRetrievePath = retrievePath + username + "/";

  function removeFileFromFileUploadErrors(filename) {
    setFileUploadErrors(fileUploadErrors.filter((fileUploadError) => fileUploadError === filename));
    getObjectsAsync({ Prefix: userRetrievePath });
  }

  function addToPendingFileUploads(filename) {
    let newFilename = filename.replace(username + "-", "");
    let pendingFileUploadsFromStorage = getPendingFileUploadsInStorage();
    pendingFileUploadsFromStorage = [...pendingFileUploadsFromStorage, newFilename];
    setPendingFileUploadsInStorage([...pendingFileUploadsFromStorage]);
    setPendingFileUploads([...pendingFileUploadsFromStorage]);
  }

  function fileUploadErrorHandler(filename) {
    let pendingFileUploadsFromStorage = getPendingFileUploadsInStorage();
    pendingFileUploadsFromStorage = pendingFileUploadsFromStorage.filter(
      (pendingFileUpload) => pendingFileUpload !== filename
    );
    setPendingFileUploadsInStorage(pendingFileUploadsFromStorage);
    setPendingFileUploads(pendingFileUploadsFromStorage);
    setFileUploadErrors([...fileUploadErrors, filename]);
  }

  function setPendingFileUploadsInStorage(newPendingFileUploadsFromStorage) {
    if (newPendingFileUploadsFromStorage) {
      localStorage.setItem("pendingFileUploads", JSON.stringify(newPendingFileUploadsFromStorage));
    } else {
      localStorage.setItem("pendingFileUploads", "[]");
      return [];
    }
  }

  function getPendingFileUploadsInStorage() {
    const stringifiedPendingFileUploadsInStorage = localStorage.getItem("pendingFileUploads");
    if (stringifiedPendingFileUploadsInStorage) {
      return JSON.parse(stringifiedPendingFileUploadsInStorage);
    } else {
      return setPendingFileUploadsInStorage();
    }
  }

  const getObjectsAsync = async (options) => {
    const objects = await getObjects(options);
    const folders = [];
    const files = [];
    objects.Contents.forEach((object) => {
      let currentObjectKey = object.Key;
      currentObjectKey = currentObjectKey.replace(userRetrievePath, "");
      let currentObjectKeyArray = currentObjectKey.split("/");

      if (currentObjectKeyArray.length > 1) {
        const folderName = currentObjectKeyArray[0];
        if (!folders.includes(folderName)) {
          folders.push(folderName);
        }
      } else {
        files.push(currentObjectKey);
      }
    });
    setFolders(folders);
    setFiles(files);
  };

  const getFolderContents = async (folder) => {
    // lists all files. folders become prefixes
    const objects = await getObjects(folder);
    const folders = [];
    const files = [];
    objects.Contents.forEach((object) => {
      const processedObject = object.Key.replace(folder + "/", "");
      if (processedObject.split("/").length > 1) {
        if (!folders.includes(processedObject.split("/")[0])) {
          folders.push(processedObject.split("/")[0]);
        }
      } else {
        files.push(processedObject);
      }
    });
    // console.log(folders);
    // console.log(files);
    setFolders(folders);
    setFiles(files);
  };

  // lists all files. folders become prefixes
  function getObjects(options) {
    const listObjectsPromise = new Promise((resolve, reject) => {
      s3.listObjects(options, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const objects = listObjectsPromise;
    return objects;
  }

  function startPollToCheckIfObjectIsUploaded(objectKey) {
    uploadStartTime.current = Date.now();
    pollIfObjectIsUploaded(objectKey);
  }

  async function pollIfObjectIsUploaded(objectKey) {
    // console.log("poll");
    const userFiles = await getUserFiles();
    if (userFiles.includes(objectKey)) {
      // console.log("object has been uploaded");
      setShouldGetObjects(true);
      return;
    }
    if (Date.now() - uploadStartTime.current > 40000) {
      fileUploadErrorHandler(objectKey);
      return;
    }
    setTimeout(() => pollIfObjectIsUploaded(objectKey), 5000);
  }

  async function getUserFiles() {
    const userFiles = [];
    const objects = await getObjects({ Prefix: userRetrievePath });
    const objectsContents = objects.Contents;
    for (let i = 0; i < objectsContents.length; i++) {
      userFiles.push(objectsContents[i].Key.replace(userRetrievePath, ""));
    }
    return userFiles;
  }

  function getFile(objectKey) {
    const params = {
      Bucket: albumBucketName,
      Key: userRetrievePath + objectKey,
    };
    const getFilePromise = new Promise((resolve, reject) => {
      s3.getObject(params, function (err, data) {
        if (err) {
          // console.log("There was an error retrieving the file");
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return getFilePromise;
  }

  function uploadFile(fileToUpload, fingerprint, callback) {
    var fileName = fileToUpload.name;
    var defaultUploadFolder = userUploadPath;

    // file key: folder/filename
    var photoKey = defaultUploadFolder + fingerprint + "-" + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new window.AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: fileToUpload,
      },
    });

    var promise = upload.promise();

    promise.then(
      function (data) {
        addToPendingFileUploads(fingerprint + "-" + fileToUpload.name);
        callback("success");
      },
      function (err) {
        removeFileFromFileUploadErrors(fingerprint + "-" + fileToUpload.name);
        // console.log("There was an error uploading your photo: ", err.message);
        callback("error");
        return;
      }
    );
  }

  function deleteFile(objectKey) {
    var params = {
      Bucket: albumBucketName,
      Key: retrievePath + username + "/" + objectKey,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        // console.log(err, err.stack);
      } else {
        getObjectsAsync({ Prefix: userRetrievePath });
      }
    });
  }

  // Check if s3 has been created
  // s3 is dependecy fullfilled by useCognito
  useEffect(() => {
    if (s3 && isFileExplorerEnabled && username) {
      let options = {};
      let prefix = userRetrievePath;
      if (currentDirectoryPath.length > 0) {
        currentDirectoryPath.forEach((path, index) => {
          prefix += path + "/";
        });
      }
      if (prefix !== "") {
        options.Prefix = prefix;
      }
      getObjectsAsync(options);
    }
    // eslint-disable-next-line
  }, [currentDirectoryPath, s3, username, isFileExplorerEnabled, userRetrievePath]);

  // initialize pendingFileUploads
  useEffect(() => {
    if (!pendingFileUploads) {
      setPendingFileUploads(getPendingFileUploadsInStorage());
    } else {
      if (s3 && pendingFileUploads.length > 0) {
        // console.log("Triggered poll from useEffect");
        startPollToCheckIfObjectIsUploaded(pendingFileUploads[0]);
      } else {
        // no op
      }
    }
  }, [pendingFileUploads]);

  // update pendingFileUploads
  useEffect(() => {
    const getPendingFileUploadsInFiles = () => {
      let pendingFileUploadsInFiles = [];
      for (let i = 0; i < pendingFileUploads.length; i++) {
        if (files.includes(pendingFileUploads[i])) {
          pendingFileUploadsInFiles.push(pendingFileUploads[i]);
        }
      }
      return pendingFileUploadsInFiles;
    };
    const getNewPendingFileUploads = () => {
      const toDeleteFromPendingFileUploads = getPendingFileUploadsInFiles();
      const newPendingFileUploads = [];
      for (let i = 0; i < pendingFileUploads.length; i++) {
        if (!toDeleteFromPendingFileUploads.includes(pendingFileUploads[i])) {
          newPendingFileUploads.push(pendingFileUploads[i]);
        }
      }
      return newPendingFileUploads;
    };
    if (pendingFileUploads) {
      setPendingFileUploadsInStorage(getNewPendingFileUploads());
      setPendingFileUploads(getNewPendingFileUploads());
    }
  }, [files]);

  // check the need to getObjects
  useEffect(() => {
    if (shouldGetObjects) {
      getObjectsAsync({ Prefix: userRetrievePath });
      setShouldGetObjects(false);
    }
  }, [shouldGetObjects]);

  return {
    files,
    folders,
    currentDirectoryPath,
    getFolderContents,
    uploadFile,
    setCurrentDirectoryPath,
    getFile,
    deleteFile,
    pendingFileUploads,
    fileUploadErrors,
    removeFileFromFileUploadErrors,
  };
};

export default useFiles;
