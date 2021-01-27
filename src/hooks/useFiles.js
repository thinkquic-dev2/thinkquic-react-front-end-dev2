import { useEffect, useState } from "react";

const useFiles = ({
  s3,
  albumBucketName,
  uploadPath,
  isFileExplorerEnabled,
}) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState([]);

  // Check if s3 has been created
  // s3 is dependecy fullfilled by useCognito
  useEffect(() => {
    if (s3 && isFileExplorerEnabled) {
      const generateCurrentDirectoryPathString = () => {
        let currentDirectoryPathString = "";
        currentDirectoryPath.forEach((path) => {
          currentDirectoryPathString += path + "/";
        });
        return currentDirectoryPathString;
      };
      const getObjectsAsync = async (options) => {
        const objects = await getObjects(options);
        const folders = [];
        const files = [];
        objects.Contents.forEach((object) => {
          let currentObjectKey = object.Key;
          currentObjectKey = currentObjectKey.replace(
            generateCurrentDirectoryPathString(),
            ""
          );
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
      let options = {};
      let prefix = "";
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
  }, [currentDirectoryPath, s3]);

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
    console.log(folders);
    console.log(files);
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

  function getFile(objectKey) {
    const params = {
      Bucket: albumBucketName,
      Key: objectKey,
    };
    const getFilePromise = new Promise((resolve, reject) => {
      s3.getObject(params, function (err, data) {
        if (err) {
          console.log("There was an error retrieving the file");
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return getFilePromise;
  }

  // const getFolderContentsFromS3 = (folder) => {
  //   console.log(folder);
  //   const listObjectsPromise = new Promise((resolve, reject) => {
  //     s3.listObjects({ Prefix: folder + "/" }, function (err, data) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     });
  //   });
  //   const objects = listObjectsPromise;
  //   return objects;
  // };

  // lists all files. folders become prefixes
  // function listFiles() {
  //   s3.listObjects({}, function (err, data) {
  //     if (err) {
  //       return alert("There was an error listing your albums: " + err.message);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }

  // lists files and folders. contents of folders are omitted
  // function listFilesWithDelimeter() {
  //   s3.listObjects({ Delimiter: "/" }, function (err, data) {
  //     if (err) {
  //       return alert("There was an error listing your albums: " + err.message);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }

  // function viewAlbum(albumName) {
  //   var albumPhotosKey = encodeURIComponent(albumName) + "/";
  //   s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
  //     if (err) {
  //       return alert("There was an error viewing your folder: " + err.message);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }

  function uploadFile(fileToUpload, fingerprint) {
    var fileName = fileToUpload.name;
    var defaultUploadFolder = uploadPath;

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
        setCurrentDirectoryPath([]);
      },
      function (err) {
        return console.log(
          "There was an error uploading your photo: ",
          err.message
        );
      }
    );
  }

  return {
    files,
    folders,
    currentDirectoryPath,
    getFolderContents,
    uploadFile,
    setCurrentDirectoryPath,
    getFile,
  };
};

export default useFiles;
