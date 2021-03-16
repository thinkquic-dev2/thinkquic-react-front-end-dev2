import React, { useRef } from "react";

import "./SelectItems.scss";

const SelectItems = ({ label, items, itemsFilter, selectedItems, setSelectedItems, type }) => {
  const selectRef = useRef();

  const dropdownItems = items
    .filter((item) => !itemsFilter.includes(item))
    .map((dropdownItem, index) => (
      <option className="select-items__dropdown-item" value={dropdownItem} key={"dropdown-item-" + index}>
        {dropdownItem}
      </option>
    ));

  const defaultDropdownItem = (dropdownItems) => {
    if (dropdownItems.length < 1) {
      return (
        <option className="select-items__dropdown-item" value="default" disabled>
          {type === "single" ? "selected: " + selectedItems[0] : "All items have been selected"}
        </option>
      );
    } else {
      return (
        <option className="select-items__dropdown-item" value="default" disabled>
          Add an item
        </option>
      );
    }
  };

  const selected = selectedItems.map((selectedItem, index) => (
    <span className="select-items__selected-item" key={"selected-item-" + index}>
      <span className="select-items__selected-item-text">{selectedItem}</span>
      <button className="select-items__remove-selected-item" onClick={() => removeItemClickhandler(selectedItem)}>
        x
      </button>
    </span>
  ));

  const selectChangeHandler = (newValue) => {
    if (newValue !== "default") {
      setSelectedItems([...selectedItems, newValue]);
      selectRef.current.value = "default";
    }
  };

  const removeItemClickhandler = (itemToRemove) => {
    const newSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== itemToRemove);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="select-items">
      <div className="select-items__title">{label}</div>
      <label htmlFor="select-items" className="d-none">
        {label}
      </label>
      <select
        name="select-items"
        className="form-control select-items__dropdown"
        onChange={(event) => selectChangeHandler(event.target.value)}
        defaultValue="default"
        ref={selectRef}
      >
        {defaultDropdownItem(dropdownItems)}
        {dropdownItems}
      </select>
      <div className="select-items__selected-items">{selected}</div>
    </div>
  );
};

export default SelectItems;
