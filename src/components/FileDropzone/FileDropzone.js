import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import XLSX from 'xlsx';
import { AppContext } from '../../AppContext';

function FileDropzone() {
  const { setUploadedJsonFile } = useContext(AppContext);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        var data = reader.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: 'array' });
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: "" });
          if (roa.length) result[sheetName] = roa;
        });
        console.log(result);
        setUploadedJsonFile(result);
      }
      reader.readAsArrayBuffer(file)
    })

  }, [setUploadedJsonFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input className="dropzone__input" {...getInputProps()} />
      {isDragActive ?
        <div className="dropzone__message dropzone__message--drag-active">
          Drop here
        </div>
        :
        <div className="dropzone__message">Click or drag data source here</div>
      }
    </div>
  )
}

export default FileDropzone;