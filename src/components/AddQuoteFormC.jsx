import React, { useState } from "react";
import { Box } from "@mui/system";
import QuoteBody from "./QuoteBody";
import { Button } from "@mui/material";
import Header from "./Header";
import { useSelector } from "react-redux";
import { DatePickerField } from "./DatePickerField";
import FormikReactSelect from "./FormikReactSelect";
import { TextField } from "@mui/material";
import { postQuote,editQuote } from "../redux/actions/quote.js";
import Store from "../redux/store";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import Loading from "./Loading";
import {useNavigate} from "react-router"
import dayjs from "dayjs";
import * as Yup from "yup";


const quoteSchema = Yup.object().shape({
  date: Yup.string().required("Enter Date"),
  customer: Yup.string().required("Customer Required"),
  quoteNo: Yup.string().required("Quotation Number is required"),
  hangers: Yup.array().of(
    Yup.object({
      hanger: Yup.string().required(),
      material: Yup.string().required(),
      hook: Yup.string().required(),
      print: Yup.string().required(),
      clip: Yup.string().required(),
      price: Yup.string().required("Price Enter Quantity"),
    })
  ),
});



const btnStyle = { height: 50, width: 300, marginTop: 40, marginBottom: 100 };

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

const paperStyle = {
  width: "100%",
  height: "100%",
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
};

const AddQuoteFormC = ({ mode, ...props }) => {
  const navigate=useNavigate()
  const { oppurtunity } = props;
  const [selectedHangers, setselectedHangers] = useState();

  const [initialValues, setInitialValues] = React.useState(
    props.initialValues
      ? {
          date: dayjs(new Date(Date(props.initialValues.date))),
          customer: props.initialValues.customer,
          hangers: props.initialValues.hangers,
          quoteNo: props.initialValues.quoteNo,
          oppurtunity:props.initialValues.oppurtunity,
          _id:props.initialValues._id,
          createdAt:props.initialValues.createdAt,
          updatedAt:props.initialValues.updatedAt,
          __v:props.initialValues.__v,
        }
      : {
          customer: oppurtunity ? oppurtunity.customer._id : "",
          hangers: [
            {
              hanger: "",
              material: "",
              hook: "",
              print: "",
              clip: "",
              price: "",
            },
          ],
          date: "",
          quoteNo: "",
        }
  );
  
  const h = useSelector((state) => state.hanger.hangers);
  const customers = useSelector((state) => state.customer.customers);
  const materials = useSelector((state) => {
    return {
      materi: state.rawMaterial.material,
      clip: state.rawMaterial.clips,
      hook: state.rawMaterial.hooks,
      print: state.rawMaterial.prints,
    };
  });
  const loading = useSelector((state) => {
    return (
      state.customer.customersLoading &&
      state.hanger.hangersLoading &&
      state.rawMaterial.materialsLoading &&
      state.rawMaterial.hooksLoading &&
      state.rawMaterial.clipsLoading &&
      state.rawMaterial.printsLoading
    );
  });

  // console.log(materials);

  const { clip, materi, print, hook } = materials;

  const e = {
    marginTop: "30px",
    width: "88%",
  };
  const onSubmit = (values, props) => {
    if (mode === "Edit") {
    //  console.log("Hi")
      // console.log(values)
      values.date = new Date(values.date).toLocaleDateString();
      values.customer=values.customer._id
      values.hangers=values.hangers.map((h)=>{
        return ({
          _id:h._id,
          clip:h.clip._id,
          hanger:h.hanger._id,
          hook:h.hook._id,
          material:h.material._id,
          print:h.print._id,
          price:h.price,
          
        })
      })
      
      Store.dispatch(editQuote(values));
        navigate("/quoteDetail?mode=edit");
    } else {
      values.oppurtunity = oppurtunity ? oppurtunity._id : null;
    values.date = new Date(values.date).toLocaleDateString();
    
    Store.dispatch(postQuote(values));
      navigate("/quoteDetail?mode=add");
    }
    // Store.dispatch(postQuote(values));
  };
  return materi && clip && hook && print ? (
    <Box style={paperStyle}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={(mode === "Edit")?(Yup.object()):quoteSchema}
      >
        {({ values, setTouched, touched,errors }) => {
          const addSelection = (s) => {
      
            const code = h.find((e) =>{
              if(s.hanger._id){
                return s.hanger._id===e._id
              }
              else{
               return e._id === s.hanger
              }
              
              });
            const mat = materi.find((e) =>{
              if(s.material._id){
                return s.material._id===e._id
              }
              else{
                return e._id === s.material
              }
              
              });
            const c = clip.find((e) =>{
              if(s.clip._id){
                return s.clip._id===e._id
              }
              else{
                return e._id === s.clip
              }
              
              });
            const ho = hook.find((e) =>{
              if(s.hook._id){
                return s.hook._id===e._id
              }
              else{
                return e._id === s.hook
              }
              
              });
            const p = print.find((e) =>{
              if(s.print._id){
                return s.print._id===e._id
              }
              else{
                return e._id === s.print
              }
              
              });
            setselectedHangers({
              hanger: code,
              material: mat,
              clips: c,
              hook: ho,
              print: p,
            });
          };
          return (
            <Form noValidate>
              <Box
                display="grid"
                gridTemplateColumns="3fr 7fr"
                
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
                  <FormikReactSelect
                    data={customers}
                    name="customer"
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
                  />
                  <DatePickerField name="date" label="Date" />
                  <Field
                    style={e}
                    as={TextField}
                    name="quoteNo"
                    error={!!touched.quoteNo && !!errors.quoteNo}
                  helperText={touched.quoteNo && errors.quoteNo}
                  helperText={<ErrorMessage name="quoteNo" />}
                    label="Quote Number"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    required
                  />

                  <Button
                    type="submit"
                    style={btnStyle}
                    variant="contained"
                    color="secondary"
                  >
                    Register
                  </Button>

                  {selectedHangers ? (
                    <Box>
                      <QuoteBody data={selectedHangers} />{" "}
                    </Box>
                  ) : null}
                </Box>

                <Box>
                  <Header subtitle="Add Hangers" />
                  <FieldArray name="hangers">
                    {({ insert, remove, push }) => (
                      <div id={Math.random() * 10000}>
                        {values.hangers.length > 0 &&
                          values.hangers.map((hanger, index) => (
                            <Box display="flex" key={index}>
                              <FormikReactSelect
                                placeholder={
                                  values.hangers[index].hanger.code
                                    ? values.hangers[index].hanger.code
                                    : "Enter Hanger"
                                }
                                code={true}
                                name={`hangers[${index}].hanger`}
                                data={h}
                              />

                              <FormikReactSelect
                                name={`hangers[${index}].material`}
                                placeholder={
                                  values.hangers[index].material.name
                                    ? values.hangers[index].material.name
                                    : "Enter Material"
                                }
                                data={materi}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].clip`}
                                placeholder={
                                  values.hangers[index].clip.name
                                    ? values.hangers[index].clip.name
                                    : "Enter Clip"
                                }
                                data={clip}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].hook`}
                                placeholder={
                                  values.hangers[index].hook.name
                                    ? values.hangers[index].hook.name
                                    : "Enter Hook"
                                }
                                data={hook}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].print`}
                                placeholder={
                                  values.hangers[index].print.name
                                    ? values.hangers[index].print.name
                                    : "Enter Print"
                                }
                                data={print}
                              />

                              <Button
                                onClick={() =>
                                  addSelection(values.hangers[index])
                                }
                              >
                                Calculate
                              </Button>

                              <Field
                                style={{
                                  margin: "10px",
                                  width: "200px",
                                }}
                                as={TextField}
                                name={`hangers[${index}].price`}
                                label="Price"
                                fullWidth
                                error={!!touched.hangers && !!errors.hangers}
                                helperText={touched.hangers && errors.hangers}
                                helperText={<ErrorMessage name={`hangers[${index}].price`} />}
                                required
                              />

                              <Button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Remove Item
                              </Button>
                            </Box>
                          ))}
                        <Button
                          type="button"
                          className="secondary"
                          onClick={() =>
                            push({
                              hanger: "",
                              material: "",
                              hook: "",
                              print: "",
                              clip: "",
                              price: "",
                            })
                          }
                        >
                          Add Hanger
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  ) : (
    <Loading />
  );
};

export default AddQuoteFormC;
