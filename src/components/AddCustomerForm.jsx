import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box } from "@mui/system";
import Header from "./Header";
import * as Yup from "yup";
import AddressInput from "./AddressInput";
import FormikReactSelect from "./FormikReactSelect";
import { addCustomer } from "../redux/actions/customer.js";
import Store from "../redux/store";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const customerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

  contactName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("ContactName is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required"),

  email: Yup.string().email().required("Email is required"),

  gstin: Yup.string().required("GSTIN is required"),
  buyerCategory: Yup.string().required("Buyer Category is required"),
  billingAddress: Yup.object().shape({
    addressLine1: Yup.string().required(),
    addressLine2: Yup.string().required(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    pincode: Yup.string().required(),
  }),
  shippingAddress: Yup.object().shape({
    addressLine1: Yup.string().required(),
    addressLine2: Yup.string().required(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    pincode: Yup.string().required(),
  }),
  paymentTerms: Yup.string().required(),
});

const AddCustomerForm = () => {
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
  const users=useSelector((state)=>state.user.users)
  const btnStyle = { height: 50, width: 300, marginTop: 20, marginBottom: 100 };
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    gstin: "",
    buyerCategory: "",
    handledBy: "653fd5481fbc1959a580c7ec",
    billingAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    shippingAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pinCode: "",
    },
    merchandiser: { name: "", email: "", number: "" },
    accountant: { name: "", email: "", number: "" },
    purchase: { name: "", email: "", number: "" },
    transporter: { name: "", terms: "" },
    paymentTerms: "",
  });

  const onSubmit = (values, props) => {
    Store.dispatch(addCustomer(values));
    navigate("/customers");
  };
  return (
    <Box style={paperStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={customerSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setTouched
        }) => (
          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="4fr 6fr 3fr"
              gridColumnGap="50px"
              justifyContent="stretch"
              alignItems="stretch"
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
                  label="Name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="contactName"
                  label="Contact Name"
                  error={!!touched.contactName && !!errors.contactName}
                  helperText={touched.contactName && errors.contactName}
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="email"
                  label="Email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="gstin"
                  label="GSTIN"
                  error={!!touched.gstin && !!errors.gstin}
                  helperText={touched.gstin && errors.gstin}
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
                <FormikReactSelect
                  name="buyerCategory"
                  placeholder="Buyer Category"
                  val={true}
                  error={!!touched.buyerCategory && !!errors.buyerCategory}
                  helperText={touched.buyerCategory && errors.buyerCategory}
                  data={[
                    { name: "H&B" },
                    { name: "RedTag" },
                    { name: "Others" },
                  ]}
                />
                <FormikReactSelect
                  name="handledBy"
                  placeholder="Handled By"
                  data={users}
                />
              </Box>

              <Box
                style={{
                  width: "70%",
                  height: "100%",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <AddressInput
                  error={!!touched.billingAddress && !!errors.billingAddress}
                  helperText={touched.billingAddress && errors.billingAddress}
                  name="billingAddress"
                  field={"Billing Address"}
                />
                <Button
                  onClick={() => {
                   values.shippingAddress=values.billingAddress
                  }}
                >
                  Copy Billing Address
                </Button>
                <AddressInput
                  error={!!touched.shippingAddress && !!errors.shippingAddress}
                  helperText={touched.shippingAddress && errors.shippingAddress}
                  name="shippingAddress"
                  field={"Shipping Address"}
                />
              </Box>
              <Box>
                <Header subtitle="Logistics Terms" />
                <FormikReactSelect
                  name="paymentTerms"
                  error={!!touched.paymentTerms && !!errors.paymentTerms}
                  helperText={touched.paymentTerms && errors.paymentTerms}
                  placeholder="Payment Terms"
                  val={true}
                  data={[
                    { name: "Advance" },
                    { name: "AgainstDispatch" },
                    { name: "50% advance" },
                    { name: "NET30" },
                    { name: "NET60" },
                  ]}
                />
                <FormikReactSelect
                
                  name="transporter.name"
                  placeholder="Transporter Name"
                  val={true}
                  data={[
                    { name: "KVT" },
                    { name: "GatiRoadWays" },
                    { name: "XpressBee" },
                  ]}
                />
                <Field
                  style={e}
                  as={TextField}
                  name="transporter.terms"
                  label="Transporter Terms"
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <Box
              display="grid"
              marginTop="30px"
              gridTemplateColumns="3fr 3fr 3fr"
              justifyContent="stretch"
              alignItems="stretch"
            >
              <Box marginTop="20px">
                <Header subtitle="Merchandiser Contact" />
                <Field
                  style={e}
                  as={TextField}
                  name="merchandiser.name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="merchandiser.email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="merchandiser.number"
                  label="Phone Number"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
              </Box>

              <Box marginTop="20px">
                <Header subtitle="Purchase Contact" />
                <Field
                  style={e}
                  as={TextField}
                  name="purchase.name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="purchase.email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="purchase.number"
                  label="Phone Number"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
              </Box>
              <Box marginTop="20px">
                <Header subtitle="Accountant Contact" />
                <Field
                  style={e}
                  as={TextField}
                  name="accountant.name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="Date" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="accountant.email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="accountant.number"
                  label="Phone Number"
                  fullWidth
                  helperText={<ErrorMessage name="phoneNumber" />}
                  required
                />
              </Box>
              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddCustomerForm;
