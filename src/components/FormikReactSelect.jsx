import { useField, useFormikContext } from "formik";
import React from "react";
import Select from "react-select";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f0f0f0",
    marginTop: 30,
    width: "100%",
  }),
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

const FormikReactSelect = (props) => {
  const {
    name,
    data,
    placeholder,
    val,
    disabled,
    identi,
    code,
    add,
    onSel,
    type,
    ...restProps
  } = props;

  const [field,meta] = useField(name);

  const { setFieldValue, values } = useFormikContext();

  React.useEffect(() => {}, [values.shippingAddress]);

  //flatten the options so that it will be easier to find the value
  const flattenedOptions = props.options?.flatMap((o) => {
    const isNotGrouped = "value" in o;
    if (isNotGrouped) {
      return o;
    } else {
      return o.options;
    }
  });
  const options = data.map((e) => {
    if (identi) {
      return {
        label: e.ID,
        value: e._id,
      };
    } else if (add) {
      return {
        label: e.displayValue,
        value: e,
      };
    } else if (val) {
      return {
        label: e.name,
        value: e.name,
      };
    } else if (code) {
      return {
        label: e.code,
        value: e._id,
      };
    } else {
      return {
        label: e.name,
        value: e._id,
      };
    }
  });
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
    <>
    <Select
      {...restProps}
      isClearable={false}

      isDisabled={props.disabled ? props.disabled : false}
      options={options}
      placeholder={<div>{placeholder}</div>}
      value={value}
      styles={colourStyles}
      name={name}
      onChange={(val) => {
        const _val = val;
        if (onSel) {
          onSel(_val);
        }
        const isArray = Array.isArray(_val);
        if (isArray) {
          const values = _val.map((o) => o.value);
          setFieldValue(name, values);
        } else if (type === "address") {
          setFieldValue(name, _val.value.value);
        } else {
          setFieldValue(name, _val.value);
        }
      }}
    />
    {meta.error && <span style={{color:"red"}}> Please select Value</span>}
    </>
  );
};

export default FormikReactSelect;
