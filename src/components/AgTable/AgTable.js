import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

const AgTable = ({
  uploadedJsonFile,
  onGridReady,
  onColumnVisible,
  display,
  setDisplay,
  uploadFileInputRef,
}) => {
  const { uploadFile, setUploadedJsonFile } = useContext(AppContext);
  const [fullScreen, setFullScreen] = useState(false);
  const closeTableIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
  const fullScreenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
  const exitFullScreenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
  );
  const uploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
    </svg>
  );
  const isUploadEnabled =
    uploadFileInputRef.current && uploadFileInputRef.current.files.length > 0
      ? true
      : false;

  const agTableContainerClass = () => {
    if (fullScreen) {
      return "ag-table ag-table--fullscreen";
    } else {
      return "ag-table";
    }
  };
  const handleUploadFileClick = () => {
    console.log("handleUploadFile");
    console.log(uploadFileInputRef.current.files[0]);
    uploadFile(uploadFileInputRef.current.files[0], "pavan-manepali");
    setUploadedJsonFile(null);
    setDisplay(false);
    uploadFileInputRef.current.value = null;
  };

  if (!uploadedJsonFile) {
    return null;
  } else {
    if (display) {
      return (
        <div className={agTableContainerClass()}>
          <div className="ag-table__controls">
            <button
              className="ag-table__control-button btn btn-outline-secondary"
              onClick={() => {
                setDisplay(false);
              }}
            >
              {closeTableIcon}
            </button>
            {fullScreen ? (
              <button
                className="ag-table__control-button btn btn-outline-secondary mx-2"
                onClick={() => {
                  setFullScreen(false);
                }}
              >
                {exitFullScreenIcon}
              </button>
            ) : (
              <button
                className="ag-table__control-button btn btn-outline-secondary mx-2"
                onClick={() => {
                  setFullScreen(true);
                }}
              >
                {fullScreenIcon}
              </button>
            )}
            {isUploadEnabled ? (
              <button
                className="ag-table__control-button btn btn-outline-secondary"
                onClick={() => {
                  handleUploadFileClick();
                }}
              >
                {uploadIcon}
              </button>
            ) : null}
          </div>
          <div
            className="ag-table__container ag-theme-balham"
            style={{ height: "calc(100% - 54px)", width: "100%" }}
          >
            <AgGridReact
              rowData={uploadedJsonFile.rowData}
              rowSelection="multiple"
              onGridReady={onGridReady}
              onColumnVisible={onColumnVisible}
            >
              {uploadedJsonFile.columnDefs.map((column, index) => (
                <AgGridColumn
                  key={index}
                  field={column.field}
                  sortable={true}
                  filter={true}
                  checkboxSelection={index === 0 ? true : false}
                ></AgGridColumn>
              ))}
            </AgGridReact>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default AgTable;
