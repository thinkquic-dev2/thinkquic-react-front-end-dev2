import React from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const AgTableNew = ({ jsonData, onGridReady, onColumnVisible }) => {
  return (
    <div className="ag-table__container ag-theme-balham" style={{ height: "calc(100% - 54px)", width: "100%" }}>
      <AgGridReact
        rowData={jsonData.rowData}
        rowSelection="multiple"
        onGridReady={onGridReady}
        onColumnVisible={onColumnVisible}
      >
        {jsonData.columnDefs.map((column, index) => (
          <AgGridColumn
            key={index}
            field={column.field}
            sortable={true}
            filter={true}
            // checkboxSelection={index === 0 ? true : false}
          ></AgGridColumn>
        ))}
      </AgGridReact>
    </div>
  );
};

export default AgTableNew;
