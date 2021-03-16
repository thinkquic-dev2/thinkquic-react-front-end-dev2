import React from 'react';

import SidebarItem from '../SidebarItem/SidebarItem';
import Submenu from '../Submenu/Submenu'

const ColumnOptions = ({ data, resetState, gridColumnApi, saveColumnState }) => {
  const columnToggle = () => {
    if (data && gridColumnApi) {
      const uploadedJsonFile = data;
      const columnState = gridColumnApi.getColumnState();
      return columnState.map((column, index) => {
        const onClickHandler = () => {
          const newState = gridColumnApi.getColumnState();
          if (column.hide) {
            newState[index].hide = false;
            saveColumnState(newState);
            gridColumnApi.applyColumnState({
              state: newState
            });
          } else {
            newState[index].hide = true;
            saveColumnState(newState);
            gridColumnApi.applyColumnState({
              state: newState
            });
          }
        }
        return (
          <SidebarItem
            key={index}
            icon={column.hide ? columnInvisibleIcon : columnVisibleIcon}
            text={uploadedJsonFile.columnDefs[index] ? uploadedJsonFile.columnDefs[index].headerName : null}
            onClickHandler={onClickHandler} />
        )
      }
      )
    }
  }
  const columnOptionsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z" />
    </svg>)
  const columnVisibleIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
  const columnInvisibleIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none" /><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>;
  const resetStateIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" /></svg>
  return (
    <SidebarItem icon={columnOptionsIcon} text={"Options"} onClickHandler={() => console.log("Clicked Column Options")}>
      <Submenu>
        <SidebarItem
          icon={resetStateIcon}
          text={"Reset Columns"}
          onClickHandler={resetState} />
        {columnToggle()}
      </Submenu>
    </SidebarItem>
  )
}

export default ColumnOptions;