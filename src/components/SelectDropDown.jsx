import { useField } from "formik";
import React from "react";
import Select from "react-select";


const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#f0f0f0", marginTop: 10,width:"50%" }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#F5A169",
    margin: 5,
    width: "100%",
    display: "flex",
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999, margin: 10 }),
  placeholder: (styles) => ({ ...styles, color: "#123C43" }),
  singleValue: (styles) => ({ ...styles, color: "#123C43" }),
};

const SelectDropDown = (props) => {
  const { name, data, placeholder,val,disabled,identi, ...restProps } = props;
  const [field] = useField(name);

  
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });
  const options = data.map((e) => {
      return {
        label: e.displayValue,
        value: e,
      };
  }
  );
  //get the value using flattenedOptions and field.value
  const value = flattenedOptions?.filter((o) => {
    const isArrayValue = Array.isArray(field.value);

    if (isArrayValue) {
      const values = field.value;
      return values.includes(o.value);
    } else {
      return field.value === o.value;
    }
  });

  return (
    <Select
      {...restProps}
      isDisabled={props.disabled?props.disabled:false}
      options={options}
      placeholder={<div>{placeholder}</div>}
      value={value}
      styles={colourStyles}
      onChange={(val) => {
        const _val = val;
        props.onSel(_val)
      }}
    />
  );
};

export default SelectDropDown;
