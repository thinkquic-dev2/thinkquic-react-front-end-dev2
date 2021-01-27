import XLSX from 'xlsx';

const useExcelToJson = () => {
  const convertExcelToJson = (acceptedFiles, callback) => {
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
        const formattedData = formatJsonForAgTable(result);
        callback(formattedData);
      }
      reader.readAsArrayBuffer(file);
    });
  }
  const convertExcelFromS3ToJson = (excelFromS3) => {
    var data = excelFromS3;
    var workbook = XLSX.read(data, { type: 'array' });
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: "" });
      if (roa.length) result[sheetName] = roa;
    });

    const formattedData = formatJsonForAgTable(result);
    return formattedData;
  }
  const formatJsonForAgTable = (json) => {
    const columnDefs = [];
    const rowData = [];
    const jsonKeys = Object.keys(json);
    // extract the columns
    json[jsonKeys[0]][0].forEach((column) => {
      columnDefs.push({
        headerName: column,
        field: column
      });
    });
    // extract the row data
    const rowDataLength = json[jsonKeys[0]].length; //because the first row is column headings
    for (let i = 1; i < rowDataLength; i++) {
      const jsonRowData = json[jsonKeys[0]][i];
      const formattedRow = {};
      for (let j = 0; j < columnDefs.length; j++) {
        formattedRow[columnDefs[j].field] = jsonRowData[j];
      }
      rowData.push(formattedRow);
    }
    return {
      columnDefs,
      rowData
    }

    // {
    //   columnDefs: [
    //     { headerName: "Make", field: "make", display: true },
    //     { headerName: "Model", field: "model", display: true },
    //     { headerName: "Price", field: "price", display: true }

    //   ],
    //   rowData: [
    //     { make: "Toyota", model: "Celica", price: 35000 },
    //     { make: "Ford", model: "Mondeo", price: 32000 },
    //     { make: "Porsche", model: "Boxter", price: 72000 }
    //   ]
    // }
  }

  return {
    convertExcelToJson,
    convertExcelFromS3ToJson
  }
}

export default useExcelToJson;