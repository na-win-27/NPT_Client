import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box } from "@mui/system";
import FormikReactSelect from "./FormikReactSelect";
import { editOppurtunity, postOppurtunity } from "../redux/actions/oppurtunity.js";
import Store from "../redux/store";
import { useNavigate } from "react-router";
import * as Yup from "yup";



const oppurtunitySchema = Yup.object().shape({
  customer: Yup.string().required("Company Name is Required"),
  buyerCategory: Yup.string().required(),
  stage: Yup.string(),
  description: Yup.string(),
});

const AddOppurtunityForm = (props) => {
  const { customer, mode } = props;
  const navigate = useNavigate();

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

  const [initialValues, setInitialValues] = React.useState(
    props.initialValues
      ? {
          companyName: props.initialValues.customer.name,
          customer: props.initialValues.customer._id,
          ...props.initialValues,
        }
      : {
          customer: customer._id,
          companyName: customer.name,
          stage: "Discussions",
          description: "",
          refferedBy: "",
          buyerCategory: customer.buyerCategory,
        }
  );

  const onSubmit = (values, props) => {
    if (mode === "Edit") {
      values.customer = values.customer._id;
      Store.dispatch(editOppurtunity(values));
      navigate("/oppurtunityDetail?mode=edit");
    } else {
      delete values.companyName;

      Store.dispatch(postOppurtunity(values));
      navigate("/oppurtunityDetail?mode=add");
    }
  };
  return (
    <Box style={paperStyle}>
      <Formik initialValues={initialValues} validationSchema={(mode === "Edit")?(Yup.object()):oppurtunitySchema} onSubmit={onSubmit}>
        {(touched,errors,values) => (
          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="4fr 4fr"
              justifyContent="right"
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
                  name="companyName"
                  label="Company Name"
                  error={!!touched.customer && !!errors.customer}
                  helperText={touched.customer && errors.customer}
                  fullWidth
                  helperText={<ErrorMessage name="customer" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="stage"
                  label="Stage"
                  disabled={true}
                  fullWidth
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="description"
                  multiline={true}
                  rows={7}
                  label="Description"
                  fullWidth
                />
                <Field
                  style={e}
                  as={TextField}
                  name="refferedBy"
                  label="Reffered By"
                  fullWidth
                  required
                />
                <FormikReactSelect
                  name="buyerCategory"

                  placeholder={"Buyer Category"}
                  val={true}
                  data={[
                    { name: "H&B" },
                    { name: "RedTag" },
                    { name: "Others" },
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
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOppurtunityForm;
