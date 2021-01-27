import { useState } from "react";
import { useEffect } from "react";

const useAgTable = (uploadedJsonFile) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [columnState, setColumnState] = useState(null);

  useEffect(() => {
    if (uploadedJsonFile && gridColumnApi) {
      saveColumnState();
    }
  }, [uploadedJsonFile]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const saveColumnState = () => {
    setColumnState(gridColumnApi.getColumnState());
  };
  const restoreColumnState = () => {
    gridColumnApi.applyColumnState({ state: columnState });
  };
  const resetState = () => {
    gridColumnApi.resetColumnState();
    console.log(gridColumnApi.getColumnState());
  };
  const onColumnMoved = (e) => {
    console.log("Event Column Moved", e);
  };
  const onColumnVisible = (e) => {
    saveColumnState();
  };

  return {
    gridApi,
    setGridApi,
    gridColumnApi,
    setGridColumnApi,
    columnState,
    setColumnState,
    onGridReady,
    saveColumnState,
    restoreColumnState,
    resetState,
    onColumnMoved,
    onColumnVisible,
  };
};

export default useAgTable;
