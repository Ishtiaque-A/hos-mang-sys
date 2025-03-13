/* eslint-disable react/prop-types */

import { HiOutlineSelector } from "react-icons/hi";
import { PiSpinnerGapBold } from "react-icons/pi";
import ReactSelect from "react-select";

const IndicatorSeparator = (props) => {
  return (
    <HiOutlineSelector
      {...props}
      size={20}
      className="me-1"
      color="gray"
    ></HiOutlineSelector>
  );
};

const LoadingIndicator = ({ activeColor, ...props }) => (
  <PiSpinnerGapBold
    {...props}
    size={20}
    className="me-2"
    style={{
      animation: "spin 1s linear infinite",
      accentColor: activeColor,
    }}
    color="gray"
  ></PiSpinnerGapBold>
);

const SimpleSelect = ({
  options,
  value,
  onChange,
  isSearchable = true,
  isClearable = true,
  maxMenuHeight = 200,
  isLoading = false,
  isDisabled = false,
  activeColor = "#69B128",
  radius = "10px",
  width = "200px",
  placeholder = "Select",
}) => {
  return (
    <ReactSelect
      isClearable={isClearable}
      placeholder={placeholder}
      isSearchable={isSearchable}
      inputId="react-select-3-input"
      isLoading={isLoading}
      isDisabled={isDisabled}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: (props) => <IndicatorSeparator {...props} />,
        LoadingIndicator: (props) => (
          <LoadingIndicator {...props} activeColor={activeColor} />
        ),
      }}
      menuShouldBlockScroll
      maxMenuHeight={maxMenuHeight}
      className="simple-scrollbar"
      styles={{
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          overflowX: "hidden",
          borderRadius: radius,
          width: width,
        }),
        menuPortal: (base) => ({
          ...base,
          borderRadius: radius,
        }),
        menuList: (provided) => ({
          ...provided,
          backgroundColor: "white",
          margin: "0px",
          padding: "0px",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: maxMenuHeight + "px",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cccccc",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fcfcfc",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#cccccc #fcfcfc",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? activeColor : null,
          color: state.isSelected ? "#FFFFFF" : null,
          "&:hover": {
            backgroundColor: "#E4F7E2",
            color: activeColor,
          },
          "&:focus": {
            backgroundColor: "#E4F7E2",
          },
        }),
        control: (provided, state) => ({
          ...provided,
          borderColor: activeColor,
          borderRadius: radius,
          width: width,
          boxShadow: state.isFocused
            ? "0 0 0 1px " + activeColor
            : provided.boxShadow,
          "&:hover": {
            borderColor: activeColor,
          },
        }),
      }}
      value={value}
      onChange={onChange}
      options={options || []}
    ></ReactSelect>
  );
};

export default SimpleSelect;
