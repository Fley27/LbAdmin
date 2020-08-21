import React from "react";
import chroma from "chroma-js";
import Select from "react-select";
import "./combo-box.scss";
import "./multi-select.scss";

const Multi = ({ HandleChange, items, label, ...otherProps }) => {
  const selectStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white", height: 50 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <div className='combo-group'>
      <label className='label'>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={HandleChange}
        {...otherProps}
        options={items}
        styles={selectStyles}
      />
    </div>
  );
};

export default Multi;
