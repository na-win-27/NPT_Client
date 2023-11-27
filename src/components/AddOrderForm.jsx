import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Box } from "@mui/system";
import FormikReactSelect from "./FormikReactSelect";
import Header from "./Header";
import { postOrder, editOrder } from "../redux/actions/order.js";
import Store from "../redux/store";
import Select from "react-select";
import { useSelector } from "react-redux";
import { DatePickerField } from "./DatePickerField";
import Loading from "./Loading";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const orderSchema = Yup.object().shape({
  date: Yup.string().required("Enter Date"),
  customer: Yup.string().required("Customer Required"),
  supplyDate: Yup.string().required("Enter Cycle Time"),
  orderNo: Yup.string().required("Sales Order Number"),
  customerOrderNo: Yup.string().required("Customer PO Number"),
  paymentTerms: Yup.string().required("Payment Terms required"),
  hangers: Yup.array().of(
    Yup.object({
      hanger: Yup.string().required(),
      material: Yup.string().required(),
      hook: Yup.string().required(),
      print: Yup.string().required(),
      clip: Yup.string().required(),
      quantity: Yup.string().required("Please Enter Quantity"),
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

const AddOrderForm = ({ mode, ...props }) => {
  const navigate = useNavigate();
  const { oppurtunity } = props;

  const loading = useSelector((state) => {
    return (
      state.customer.customerLoading ||
      state.rawMaterial.materialsLoading ||
      state.rawMaterial.hooksLoading ||
      state.rawMaterial.clipsLoading ||
      state.rawMaterial.printsLoading
    );
  });

  const materials = useSelector((state) => {
    return {
      materi: state.rawMaterial.material,
      clip: state.rawMaterial.clips,
      hook: state.rawMaterial.hooks,
      print: state.rawMaterial.prints,
    };
  });
  const h = useSelector((state) => state.hanger.hangers);
  const customers = useSelector((state) => state.customer.customers);

  const c = customers
    ? customers.map((e) => {
        return {
          label: e.name,
          value: e._id,
        };
      })
    : null;

  const { clip, materi, print, hook } = materials;

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
  console.log("props", props);
  const [initialValues, setInitialValues] = React.useState(
    props.initialValues
      ? {
          date: dayjs(new Date(Date(props.initialValues.date))),
          supplyDate: dayjs(new Date(Date(props.initialValues.supplyDate))),
          subject: props.initialValues.subject,
          customer: props.initialValues.customer,
          hangers: props.initialValues.hangers,
          orderNo: props.initialValues.orderNo,
          customerOrderNo: props.initialValues.customerOrderNo,
          oppurtunity: props.initialValues.oppurtunity,
          _id: props.initialValues._id,
          createdAt: props.initialValues.createdAt,
          updatedAt: props.initialValues.updatedAt,
          __v: props.initialValues.__v,
          paymentTerms: props.initialValues.paymentTerms,
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
              quantity: "",
            },
          ],
          orderNo: "",
          paymentTerms: "",
          date: dayjs(Date.now()),
          supplyDate: "",
          customerOrderNo: "",
          subject: "",
        }
  );

  const onSubmit = (values, props) => {
    if (mode === "Edit") {
      //  console.log("Hi")
      // console.log(values)
      values.date = new Date(values.date).toLocaleDateString();
      values.supplyDate = new Date(values.supplyDate).toLocaleDateString();
      values.customer = values.customer._id;
      values.hangers = values.hangers.map((h) => {
        return {
          _id: h._id,
          clip: h.clip._id,
          hanger: h.hanger._id,
          hook: h.hook._id,
          material: h.material._id,
          print: h.print._id,
          quantity: h.quantity,
        };
      });
      console.log(values);
      Store.dispatch(editOrder(values));
      navigate("/orderDetail?mode=edit");
    } else {
      values.oppurtunity = oppurtunity ? oppurtunity._id : "";
      values.date = new Date(values.date).toLocaleDateString();
      values.supplyDate = new Date(values.supplyDate).toLocaleDateString();
      console.log(values);
      Store.dispatch(postOrder(values));
      navigate("/orderDetail?mode=add");
    }
  };
  return !loading ? (
    <Box style={paperStyle}>
      <Formik
        validationSchema={(mode === "Edit")?(Yup.object()):orderSchema}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setTouched, touched, errors }) => (
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
                <Select
                  isDisabled={oppurtunity}
                  options={c}
                  placeholder={
                    <div>
                      {oppurtunity
                        ? oppurtunity.customer.name
                        : "Select Customer"}
                    </div>
                  }
                  styles={colourStyles}
                  onChange={(val) => {
                    values.customer = val.value;
                    const c = customers.find((c) => c._id === val.value);
                    values.paymentTerms = c.paymentTerms;
                    setTouched(["paymentTerms"]);
                    //   const isArray = Array.isArray(_val);
                    //   if (isArray) {
                    //     const values = _val.map((o) => o.value);
                    //     setFieldValue(name, values);
                    //   } else {
                    //     setFieldValue(name, _val.value);
                    //   }
                  }}
                />
                <DatePickerField name="date" label="Date" />
                <DatePickerField name="supplyDate" label="Supply Date" />

                <Field
                  style={e}
                  as={TextField}
                  name="orderNo"
                  label="Order Number"
                  fullWidth
                  error={!!touched.orderNo && !!errors.orderNo}
                  helperText={touched.orderNo && errors.orderNo}
                  helperText={<ErrorMessage name="orderNo" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="customerOrderNo"
                  label="Customer PO No"
                  fullWidth
                  error={!!touched.customerOrderNo && !!errors.customerOrderNo}
                  helperText={touched.customerOrderNo && errors.customerOrderNo}
                  helperText={<ErrorMessage name="customerOrderNo" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="subject"
                  label="Subject"
                  fullWidth
                  error={!!touched.subject && !!errors.subject}
                  helperText={touched.subject && errors.subject}
                  helperText={<ErrorMessage name="subject" />}
                  required
                />

                <Field
                  disabled={true}
                  style={e}
                  as={TextField}
                  name="paymentTerms"
                  label="Payment Terms"
                  fullWidth
                  error={!!touched.paymentTerms && !!errors.paymentTerms}
                  helperText={touched.paymentTerms && errors.paymentTerms}
                  helperText={<ErrorMessage name="paymentTerms" />}
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

              <Box>
                <Header subtitle="Add Hangers" />
                {materi && clip && hook && print ? (
                  <FieldArray name="hangers">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.hangers.length > 0 &&
                          values.hangers.map((hanger, index) => (
                            <Box key={index} display="flex">
                              <FormikReactSelect
                                placeholder={
                                  values.hangers[index].hanger
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
                                  values.hangers[index].material
                                    ? values.hangers[index].material.name
                                    : "Enter Material"
                                }
                                data={materi}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].clip`}
                                placeholder={
                                  values.hangers[index].clip
                                    ? values.hangers[index].clip.name
                                    : "Enter Clip"
                                }
                                data={clip}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].hook`}
                                placeholder={
                                  values.hangers[index].hook
                                    ? values.hangers[index].hook.name
                                    : "Enter Hook"
                                }
                                data={hook}
                              />
                              <FormikReactSelect
                                name={`hangers[${index}].print`}
                                placeholder={
                                  values.hangers[index].print
                                    ? values.hangers[index].print.name
                                    : "Enter Print"
                                }
                                data={print}
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
                              quantity: "",
                            })
                          }
                        >
                          Add Hanger
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                ) : (
                  <Box>ERROR</Box>
                )}
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  ) : (
    <Loading />
  );
};

export default AddOrderForm;
