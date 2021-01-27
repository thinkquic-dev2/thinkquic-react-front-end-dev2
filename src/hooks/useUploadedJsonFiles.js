import { useState } from 'react';
const useUploadedJsonFiles = () => {
  const [uploadedJsonFile, setUploadedJsonFile] = useState(null);
  return {
    uploadedJsonFile,
    setUploadedJsonFile
  }
}

export default useUploadedJsonFiles;