import React from "react";
import Select from "react-select";
import { useField } from "formik";

const SingleSelect = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleSingleSelectChange = (selectedOption) => {
    helpers.setValue(selectedOption);
  };

  const handleSingleSelectBlur = () => {
    helpers.setTouched(true);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 5,
      borderColor: state.isFocused ? "#5a67d8" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(90, 103, 216, 0.25)" : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "orange" : "white",
      color: state.isSelected ? "white" : "orange",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "orange",
    }),
  };

  const responsiveStyles = {
    minWidth: "100%", // Adjust the minimum width as per your needs
  };

  return (
    <div style={responsiveStyles}>
      <label>{label}</label>
      <Select
        options={options}
        {...field}
        {...props}
        onChange={handleSingleSelectChange}
        onBlur={handleSingleSelectBlur}
        value={field.value}
        styles={customStyles}
      />
    </div>
  );
};

export default SingleSelect;
