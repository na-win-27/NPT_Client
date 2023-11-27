import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, width } from "@mui/system";
import FormikReactSelect from "./FormikReactSelect";
import { postRawMaterial } from "../redux/actions/rawMaterial.js";
import Store from "../redux/store";
import { useNavigate } from "react-router";

const AddRawMaterialForm = () => {
  const navigate=useNavigate();
    const paperStyle = {
    width: "100%",
    height: "100%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
  };
  const e = {
    marginTop: "30px",
    width: "88%",
  };
  const btnStyle = { height: 50, width: 300, marginTop: 40, marginBottom: 100 };

  const initialValues = {
    name: "",
    price: "",
    unit: "",
    category: "",
    materialCategory: "",
    stock: "",
    minStock: "",
  };

  const onSubmit = (values, props) => {
    const data = { ...values };
    data.price = Number(values.price);
    data.stock = Number(values.stock);
    data.minStock = Number(values.minStock);
    
    Store.dispatch(postRawMaterial(data));
    navigate('/raw-materials?mode=add')
  };
  return (
    <Box style={paperStyle}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="4fr 4fr"
            
              justifyContent="strech"
              alignItems="center"
              width="100%"
            >
              <Box
                width="70%"
                height="100%"
                padding="20px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Field
                  style={e}
                  as={TextField}
                  name="name"
                  label="Material Name"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="price"
                  label="Price per Unit"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <FormikReactSelect
                  name="unit"
                  placeholder="Unit"
                  val={true}
                  data={[{ name: "Kilo Gram" }, { name: "Pcs" }]}
                />
                <FormikReactSelect
                  name="category"
                  placeholder="Material Category"
                  val={true}
                  data={[
                    { name: "clip" },
                    { name: "print" },
                    { name: "material" },
                    { name: "hook" },
                    { name: "cartonBox" },
                    { name: "masterBatch" },
                  ]}
                />

                <FormikReactSelect
                  name="materialCategory"
                  placeholder="HIPS/PP"
                  val={true}
                  data={[
                    { name: "PP" },
                    { name: "HIPS" },
                    { name: "LD" },
                    { name: "GPPS" },
                    { name: "ABS" },
                    { name: "EVA" },
                    { name: "HD" },
                  ]}
                />
                <Button
                  type="submit"
                  style={btnStyle}
                  variant="contained"
                  color="secondary"
                >
                  Register
                </Button>
              </Box>
              <Box
                width="70%"
                height="100%"
                padding="20px"
                display="flex"
                flexDirection="column"
              >
                <Field
                  style={e}
                  as={TextField}
                  name="stock"
                  label="Stock"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="minStock"
                  label="Min-Stock"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddRawMaterialForm;
