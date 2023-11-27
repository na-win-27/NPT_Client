import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box } from "@mui/system";
import Header from "./Header";
import * as Yup from "yup";
import FormikReactSelect from "./FormikReactSelect";
import { addCustomer, editCustomer } from "../redux/actions/customer.js";
import Store from "../redux/store";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { State, City } from "country-state-city";
import Loading from '../components/Loading'

const customerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),

  contactName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("ContactName is required"),

  phoneNumber: Yup.string().required("Phone number is required"),

  email: Yup.string().email().required("Email is required"),

  handledBy: Yup.string().required(),


  gstin: Yup.string().required("GSTIN is required"),
  buyerCategory: Yup.string().required("Buyer Category is required"),
  billingAddress: Yup.object().shape({
    addressLine1: Yup.string().required("AdressLine-1 is required"),
    addressLine2: Yup.string().required("AdressLine-2 is required"),
    state: Yup.string().required(),
    city: Yup.string().required(),
    pincode: Yup.string().required("Pincode is required"),
  }),
  transporter: Yup.object().shape({
    name: Yup.string(),
    terms: Yup.string(),
  }),
  shippingAddress: Yup.object().shape({
    addressLine1: Yup.string(),
    addressLine2: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    pincode: Yup.string(),
  }),
  paymentTerms: Yup.string().required(),
});

const AddCustomerForm = ({ mode, ...props }) => {
  const countryCode = "IN";
  const [state, setstate] = React.useState({
    value: {
      isoCode: "TN",
    },
  });

  const stateData = State.getStatesOfCountry(countryCode).map((state) => ({
    value: state.name,
    displayValue: state.name,
    isoCode: state.isoCode,
  }));

  const cityData = City.getCitiesOfState(countryCode, state.value.isoCode).map(
    (city) => ({
      value: city.name,
      displayValue: city.name,
    })
  );
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
  const users = useSelector((state) => state.user.users);

  const btnStyle = { height: 50, width: 300, marginTop: 20, marginBottom: 100 };
  const [initialValues, setInitialValues] = React.useState(
    props.initialValues
      ? props.initialValues
      : {
          name: "",
          contactName: "",
          email: "",
          phoneNumber: "",
          gstin: "",
          buyerCategory: "",
          handledBy: "",
          billingAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
          },
          shippingAddress: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
          },
          merchandiser: { name: "", email: "", number: "" },
          accountant: { name: "", email: "", number: "" },
          purchase: { name: "", email: "", number: "" },
          transporter: { name: "", terms: "" },
          paymentTerms: "",
        }
  );

  const onSubmit = (values) => {
    if (mode === "Edit") {
      Store.dispatch(editCustomer(values));
      navigate("/customerDetail?mode=edit");
    } else {
      Store.dispatch(addCustomer(values));
      navigate("/customerDetail?mode=add");
    }
  };
  return users.length>0? (
    <Box style={paperStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={(mode === "Edit")?(Yup.object()):customerSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setTouched,
        }) => (
          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="4fr 6fr 3fr"
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
                  helperText={<ErrorMessage name="name" />}
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
                  helperText={<ErrorMessage name="contactName" />}
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
                  helperText={<ErrorMessage name="gstin" />}
                  required
                />
                <FormikReactSelect
                  name="buyerCategory"
                  placeholder={
                    values.buyerCategory
                      ? values.buyerCategory
                      : "Buyer Category"
                  }
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
                  placeholder={
                    values.handledBy && users
                      ? (users.find((u) => u._id === values.handledBy)).name
                      : "Handled By"
                  }
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
                <Box>
                  <Header subtitle={"Billing Address"} />
                  <Field
                    style={e}
                    as={TextField}
                    error={!!touched.billingAddress && !!errors.billingAddress}
                    helperText={touched.billingAddress && errors.billingAddress}
                    fullWidth
                    helperText={<ErrorMessage name="billingAddress.addressLine1" />}
                    label="Address Line-1"
                    fullWidth
                    required
                    name="billingAddress.addressLine1"
                  />
                  <Field
                    style={e}
                    as={TextField}
                    error={!!touched.billingAddress && !!errors.billingAddress}
                    helperText={touched.billingAddress && errors.billingAddress}
                    helperText={<ErrorMessage name="billingAddress.addressLine2" />}
                    label="Address Line-2"
                    fullWidth
                    required
                    name="billingAddress.addressLine2"
                  />

                  <FormikReactSelect
                    add={true}
                    type="address"
                    onSel={(x) => {
                      setstate(x);
                    }}
                    name="billingAddress.state"
                    placeholder="State"
                    data={stateData}
                  />
                  <FormikReactSelect
                    type="address"
                    add={true}
                    name="billingAddress.city"
                    placeholder="City"
                    data={cityData}
                  />

                  <Field
                    style={e}
                    as={TextField}
                    label="Pincode"
                    error={!!touched.billingAddress && !!errors.billingAddress}
                    helperText={touched.billingAddress && errors.billingAddress}
                    helperText={<ErrorMessage name="billingAddress.pincode" />}
                    fullWidth
                    required
                    name="billingAddress.pincode"
                  />
                </Box>

                <Button
                  onClick={() => {
                    values.shippingAddress = values.billingAddress;
                    setInitialValues(values);
                    setTouched([
                      "shippingAddress",
                      "shippingAddress.state",
                      "shippingAddress.city",
                    ]);
                  }}
                >
                  Copy Billing Address
                </Button>

                <Box>
                  <Header subtitle={"Shipping Address"} />
                  <Field
                    style={e}
                    as={TextField}
                    label="Address Line-1"
                    fullWidth
                    
                    name="shippingAddress.addressLine1"
                  />
                  <Field
                    style={e}
                    as={TextField}
                    label="Address Line-2"
                    fullWidth
                   
                    name="shippingAddress.addressLine2"
                  />

                  <Field
                    style={e}
                    as={TextField}
                    label="State"
                    fullWidth
                   
                    name="shippingAddress.state"
                  />
                  <Field
                    style={e}
                    as={TextField}
                    label="City"
                    fullWidth
                   
                    name="shippingAddress.city"
                  />

                  <Field
                    style={e}
                    as={TextField}
                    label="Pincode"
                    fullWidth
                  
                    name="shippingAddress.pincode"
                  />
                </Box>
              </Box>
              <Box>
                <Header subtitle="Logistics Terms" />
                <FormikReactSelect
                  name="paymentTerms"
                  error={!!touched.paymentTerms && !!errors.paymentTerms}
                  helperText={touched.paymentTerms && errors.paymentTerms}
                  placeholder={
                    values.paymentTerms ? values.paymentTerms : "Payment Terms"
                  }
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
                  placeholder={
                    values.transporter["name"]
                      ? values.transporter["name"]
                      : "Transporter name"
                  }
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
                  
                 
                />
                <Field
                  style={e}
                  as={TextField}
                  name="merchandiser.email"
                  label="Email"
                  fullWidth
                 
                 
                />
                <Field
                  style={e}
                  as={TextField}
                  name="merchandiser.number"
                  label="Phone Number"
                  fullWidth
                  
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
                 
                 
                />
                <Field
                  style={e}
                  as={TextField}
                  name="purchase.email"
                  label="Email"
                  fullWidth
                
                  
                />
                <Field
                  style={e}
                  as={TextField}
                  name="purchase.number"
                  label="Phone Number"
                  fullWidth
               
                 
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
                
                />
                <Field
                  style={e}
                  as={TextField}
                  name="accountant.email"
                  label="Email"
                  fullWidth
               
                />
                <Field
                  style={e}
                  as={TextField}
                  name="accountant.number"
                  label="Phone Number"
                  fullWidth
                  
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
  ):<Loading/>;
};

export default AddCustomerForm;
