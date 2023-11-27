import React, { useState } from "react";
import { Box } from "@mui/system";
import QuoteBody from "./QuoteBody";
import { Button } from "@mui/material";
import Select from "react-select";
import { useSelector } from "react-redux";
import { postQuote } from "../redux/actions/quote.js";
import Store from "../redux/store";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f0f0f0",
    width: "150px",
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "#F5A169",
    margin: 5,
    width: "100%",
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  placeholder: (styles) => ({ ...styles, color: "#123C43" }),
  singleValue: (styles) => ({ ...styles, color: "#123C43" }),
};

const AddQuoteForm = (props) => {
  const { oppurtunity } = props;
  const [customerId, setcustomerId] = React.useState(
    props.oppurtunity.customer._id
  );

  // console.log(customerId)
  const hangers = useSelector((state) => state.hanger.hangers);
  const customer = useSelector((state) => state.customer.customers);
  const materials = useSelector((state) => state.rawMaterial.materials);
  const clip = [];
  const materi = [];
  const print = [];
  const hook = [];
  const customers = customer.map((e) => {
    return {
      label: e.name,
      value: e._id,
    };
  });
  materials.map((m) => {
    if (m.category === "material") {
      materi.push({ label: m.name, value: m });
    } else if (m.category === "clip") {
      clip.push({ label: m.name, value: m });
    } else if (m.category === "hook") {
      hook.push({ label: m.name, value: m });
    } else if (m.category === "print") {
      print.push({ label: m.name, value: m });
    }
  });

  const h = hangers.map((h) => {
    return {
      label: h.code,
      value: h,
    };
  });
  const [no, setNo] = React.useState(1);
  const [hang, setHang] = React.useState([{}]);
  const addAtIndex = (i, data) => {
    const x = hang;
    x[i] = data;
    console.log(x);
    setHang(x);
  };
  let b = [];
  const deleteAtIndex = (i, data) => {
    const x = hang;
    x.splice(i, 1);
    console.log(x);
    setHang(x);
  };

  for (let index = 0; index < no; index++) {
    b.push(
      <QuoteBody
        i={index}
        hangers={h}
        clip={clip}
        hooks={hook}
        print={print}
        materials={materi}
        del={deleteAtIndex}
        add={addAtIndex}
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Select
          options={customers}
          placeholder={<div>{oppurtunity.customer.name}</div>}
          styles={colourStyles}
          onChange={(val) => {
            const _val = val;
            setcustomerId(val.value);
            //   const isArray = Array.isArray(_val);
            //   if (isArray) {
            //     const values = _val.map((o) => o.value);
            //     setFieldValue(name, values);
            //   } else {
            //     setFieldValue(name, _val.value);
            //   }
          }}
        />
        {b}
      </Box>
      <Box>
        <Button
          fullWidth
          style={{ margin: "20px" }}
          variant="outlined"
          onClick={() => {
            const x = hang;
            x.push({});
            setHang(x);
            setNo(no + 1);
          }}
        >
          Add a New Item
        </Button>

        <Button color="secondary" onClick={() => {
          const h=hang.map((hanger)=>{
            return ({
              hanger:hanger.hanger._id,
              material:hanger.material._id,
              hook:hanger.hook._id,
              clip:hanger.clip._id,
              print:hanger.print._id,
              price:Number(hanger.price)
            })
          })
          const d={
            hangers:h,
            customer:customerId,
            oppurtunity:oppurtunity._id
          }
          console.log(d)
        }}variant="contained">
          Send Quotation
        </Button>
      </Box>
    </Box>
  );
};

export default AddQuoteForm;
