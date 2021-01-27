import React from 'react';

import SidebarItem from '../SidebarItem/SidebarItem';

const TableToggle = ({ displayData, setDisplayData }) => {
  const tableToggleIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" /></svg>);
  const toggleDisplayData = () => {
    if (displayData) {
      setDisplayData(false);
    } else {
      setDisplayData(true);
    }
  }
  return (
    <SidebarItem
      text={displayData ? 'Hide Table' : 'Show Table'}
      icon={tableToggleIcon}
      onClickHandler={toggleDisplayData}
    />
  )
}

export default TableToggle;