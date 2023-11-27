import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Box } from "@mui/system";
import FormikReactSelect from "./FormikReactSelect";
import Header from "./Header";
import { postSample, editSample } from "../redux/actions/sample.js";
import Store from "../redux/store";
import { useNavigate } from "react-router";
import Select from "react-select";
import { DatePickerField } from "./DatePickerField.jsx";
import * as Yup from "yup";

const sampleSchema = Yup.object().shape({
  date: Yup.string().required(),
  customer: Yup.string().required("Customer Required"),
  addedBy: Yup.string().required("Added By is required"),
  hangers: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      colour: Yup.string().required(),
      quantity: Yup.string().required("Enter Quantity"),
    })
  ),
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f0f0f0",
    width: "200px",
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

const AddSampleForm = ({ mode, ...props }) => {
  const navigate = useNavigate();
  const dat = useSelector((state) => {
    const mat = state.rawMaterial.material;
    const users = state.user.users.map((u) => {
      return {
        label: u.name,
        value: u._id,
      };
    });

    return {
      users,
      user: state.user.user,
      customers: state.customer.customers,
      material: mat,
      hang: state.hanger.hangers,
    };
  });

  const { material, hang, user, customers, users } = dat;

  const { oppurtunity } = props;
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
      ? { date: "", ...props.initialValues }
      : {
        date:"",
          customer: oppurtunity ? oppurtunity.customer._id : null,
          oppurtunity: oppurtunity ? oppurtunity._id : null,
          stage: "Sample",
          hangers: [
            {
              id: "",
              colour: {},
              quantity: "",
            },
          ],
          description: oppurtunity ? oppurtunity.description : "",
          addedBy:user._id,
          // buyerCategory: oppurtunity.buyerCategory,
        }
  );

  const onSubmit = (values, props) => {
    if (mode === "Edit") {
      //  console.log("Hi")
      // console.log(values)

      values.customer = values.customer._id;
      values.hangers = values.hangers.map((h) => {
        return {
          _id: h._id,
          id: h.id._id,
          colour: h.colour._id,
          quantity: h.quantity,
        };
      });
      Store.dispatch(editSample(values));
      navigate("/sampleDetail?mode=edit", { state: { sample: values._id } });
    } else {

      console.log("Hi")
      if (user.role === "admin") {
        values.addedBy = user._id;
      }
      if (user.role !== "admin") {
        delete values.oppurtunity;
      }
      
      Store.dispatch(postSample(values));
      navigate("/sampleDetail?mode=add", { state: { sample: values._id } });
    }
  };

  const customer = customers
    ? customers.map((e) => {
        return {
          label: e.name,
          value: e._id,
        };
      })
    : null;

  
  return hang && material && customer ? (
    <Box style={paperStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={(mode === "Edit")?(Yup.object()):sampleSchema}
        onSubmit={onSubmit}
      >
        {({ values,touched,errors }) => {
          console.log(errors)
          return(

          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="5fr 8fr"
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
                <Select
                  isDisabled={oppurtunity}
                  options={customer}
                  placeholder={
                    mode === "Edit" ? (
                      <div>
                        {values.customer.name
                          ? values.customer.name
                          : "Select Customer"}
                      </div>
                    ) : (
                      <div>
                        {oppurtunity
                          ? oppurtunity.customer.name
                          : "Select Customer"}
                      </div>
                    )
                  }
                  styles={colourStyles}
                  onChange={(val) => {
                    values.customer = val.value;
                  }}
                />
              {!mode==="Edit"?
                  <DatePickerField name="date" label="Enter Date" />:null}
               
                <Field
                  style={e}
                  as={TextField}
                  name="stage"
                  label="Stage"
                  disabled={true}
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="description"
                  label="Description"
                  multiline={true}
                  rows={5}
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />

                {user.role !== "admin" ? (
                  <Select
                    isDisabled={oppurtunity}
                    options={users}
                    placeholder={
                      <div>
                        {oppurtunity
                          ? oppurtunity.customer.name
                          : "Instructed By"}
                      </div>
                    }
                    styles={colourStyles}
                    onChange={(val) => {
                      values.addedBy = val.value;
                    }}
                  />
                ) : null}

                <Button
                  type="submit"
                  style={btnStyle}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Box>

              <Box>
                <Header subtitle="Add Hangers" />
                <FieldArray name="hangers">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.hangers.length > 0 &&
                        values.hangers.map((hanger, index) => (
                          <Box
                          key={index}
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                          >
                            <FormikReactSelect
                              code={true}
                              name={`hangers[${index}].id`}
                              placeholder={
                                values.hangers[index].id
                                  ? values.hangers[index].id.code
                                  : "Enter Hanger"
                              }
                              data={hang}
                            />

                            <FormikReactSelect
                              name={`hangers[${index}].colour`}
                              placeholder={
                                values.hangers[index].colour.name
                                  ? values.hangers[index].colour.name
                                  : "Enter Material"
                              }
                              data={material}
                            />
                            <Field
                              style={{
                                margin: "10px",
                                width: "200px",
                              }}
                              as={TextField}
                              name={`hangers[${index}].quantity`}
                              label="Quantity"
                              fullWidth
                              error={!!touched.hangers && !!errors.hangers}
                              helperText={touched.hangers && errors.hangers}
                              helperText={
                                <ErrorMessage
                                  name={`hangers[${index}].quantity`}
                                />
                              }
                              required
                            />

                            <Button
                              type="button"
                              variant="contained"
                              color="secondary"
                              onClick={() => remove(index)}
                            >
                              Remove Item
                            </Button>
                          </Box>
                        ))}
                      <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        className="secondary"
                        onClick={() =>
                          push({ code: {}, colour: {}, quantiy: "" })
                        }
                      >
                        Add Next Line
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Box>
            </Box>
          </Form>
        )}}
      </Formik>
    </Box>
  ) : null;
};

export default AddSampleForm;
