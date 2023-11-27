import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, width } from "@mui/system";
import FormikReactSelect from "./FormikReactSelect";
import { postHanger } from "../redux/actions/hanger.js";
import Store from "../redux/store";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const hangerSchema = Yup.object().shape({
  code: Yup.string().required("Enter Hanger Code"),
  cycleTime: Yup.string().required("Enter Cycle Time"),
  materialWeight: Yup.string().required("Material Weight  is required"),
  runnerWeight: Yup.string(),
  imageUrl: Yup.string().required("Image is required"),
  width: Yup.string().required("Width is required"),
  category: Yup.string().required("Required"),
  modeOfSupply: Yup.string().required("Required"),
  packingCost: Yup.string().required("Required"),
  jobCost: Yup.string().required("Required"),
  outSourcingPrice: Yup.string(),
  cavity: Yup.string().required("Required"),
});

const AddHangerForm = ({ mode }) => {
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

  const initialValues = {
    code: "",
    cycleTime: "",
    materialWeight: "",
    runnerWeight: "",
    modeOfSupply: "",
    imageUrl: "",
    category: "",
    width: "",
    packingCost: "",
    jobCost: "",
    cavity: "1",
  };

  const onSubmit = (values, props) => {
    const data = { ...values };
    data.cycleTime = Number(values.cycleTime);
    data.cavity = Number(values.cavity);
    data.materialWeight = Number(values.materialWeight);
    data.runnerWeight = Number(values.runnerWeight);
    data.width = Number(values.width);
    data.packingCost = Number(values.packingCost);
    data.jobCost = Number(values.jobCost);
    data.totalWeight =
      Number(values.materialWeight) + Number(values.runnerWeight);
    console.log(data);
    Store.dispatch(postHanger(data));
    navigate("/hangers?mode=add");
  };
  return (
    <Box style={paperStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={mode === "Edit" ? Yup.object() : hangerSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched }) => (
          <Form noValidate>
            <Box
              display="grid"
              gridTemplateColumns="4fr 4fr"
              gridColumnGap="40px"
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
                  name="code"
                  label="Mold Code"
                  error={!!touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                  fullWidth
                  helperText={<ErrorMessage name="code" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="cycleTime"
                  error={!!touched.cycleTime && !!errors.cycleTime}
                  helperText={touched.cycleTime && errors.cycleTime}
                  label="Cycle Time"
                  fullWidth
                  helperText={<ErrorMessage name="cycleTime" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="materialWeight"
                  error={!!touched.materialWeight && !!errors.materialWeight}
                  helperText={touched.materialWeight && errors.materialWeight}
                  label="Material Weight"
                  fullWidth
                  helperText={<ErrorMessage name="materialWeight" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  error={!!touched.runnerWeight && !!errors.runnerWeight}
                  helperText={touched.runnerWeight && errors.runnerWeight}
                  name="runnerWeight"
                  label="Runner Weight"
                  fullWidth
                  helperText={<ErrorMessage name="runnerWeight" />}
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="imageUrl"
                  label="Image Url"
                  error={!!touched.imageUrl && !!errors.imageUrl}
                  helperText={touched.imageUrl && errors.imageUrl}
                  fullWidth
                  helperText={<ErrorMessage name="imageUrl" />}
                  required
                />

                <Field
                  style={e}
                  as={TextField}
                  error={!!touched.width && !!errors.width}
                  helperText={touched.width && errors.width}
                  helperText={<ErrorMessage name="width" />}
                  name="width"
                  label="Hanger Width"
                  fullWidth
                  required
                />
              </Box>

              <Box
                width="70%"
                height="100%"
                marginTop="30px"
                padding="20px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <FormikReactSelect
                  name="category"
                  placeholder="Category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  val={true}
                  data={[
                    { name: "TOP-PH" },
                    { name: "TOP-MH" },
                    { name: "OUTER WEAR" },
                    { name: "FRAME" },
                    { name: "BOTTOM" },
                    { name: "SET" },
                    { name: "HOME-TEXTILE" },
                    { name: "MULTIPACK" },
                    { name: "SIZER" },
                    { name: "INNERWEAR" },
                    { name: "BELT" },
                    { name: "NAVIN-HOOKS" },
                    { name: "SHINE-HOOKS" },
                    { name: "FOOTWEAR" },
                  ]}
                />
                <FormikReactSelect
                  name="modeOfSupply"
                  error={!!touched.modeOfSupply && !!errors.modeOfSupply}
                  helperText={touched.modeOfSupply && errors.modeOfSupply}
                  placeholder="Mode Of Supply"
                  val={true}
                  data={[{ name: "Manufacturing" }, { name: "Trading" }]}
                />
                <Field
                  style={e}
                  as={TextField}
                  error={!!touched.packingCost && !!errors.packingCost}
                  helperText={touched.packingCost && errors.packingCost}
                  name="packingCost"
                  label="Packing Cost"
                  helperText={<ErrorMessage name="packingCost" />}
                  fullWidth
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  name="cavity"
                  error={!!touched.cavity && !!errors.cavity}
                  helperText={touched.cavity && errors.cavity}
                  helperText={<ErrorMessage name="cavity" />}
                  label="Cavity"
                  fullWidth
                  required
                />
                <Field
                  style={e}
                  as={TextField}
                  error={!!touched.jobCost && !!errors.jobCost}
                  helperText={touched.jobCost && errors.jobCost}
                  name="jobCost"
                  label="Job Work Cost"
                  helperText={<ErrorMessage name="jobCost" />}
                  fullWidth
                  required
                />
                {values.modeOfSupply === "Trading" ? (
                  <Field
                    style={e}
                    as={TextField}
                    name="outSourcingPrice"
                    label="Out Sourcing Cost"
                    fullWidth
                    required
                  />
                ) : null}
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

export default AddHangerForm;
