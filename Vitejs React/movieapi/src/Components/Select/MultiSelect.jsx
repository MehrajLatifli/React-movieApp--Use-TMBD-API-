import React from "react";
import Select from "react-select";
import { useField } from "formik";

const MultiSelect = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleMultiSelectChange = (selectedOptions) => {
    helpers.setValue(selectedOptions);
  };

  const handleMultiSelectBlur = () => {
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

  return (
    <div>
      <label>{label}</label>
      <Select 
        isMulti
        options={options}
        {...field}
        {...props}
        onChange={handleMultiSelectChange}
        onBlur={handleMultiSelectBlur}
        value={field.value}
        styles={customStyles} 
      />

    </div>
  );
};

export default MultiSelect;