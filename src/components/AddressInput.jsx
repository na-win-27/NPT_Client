import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { State, City } from "country-state-city";
import SelectDropDown from "./SelectDropDown";
import { useFormikContext } from "formik";




const AddressInput = (props) => {
  const { setFieldValue, errors } = useFormikContext();

  const countryCode = "IN";
  const [state, setstate] = useState({ value: {} });
  const [s, sets] = useState();
  const [city, setcity] = useState();
  const [addressLine1, setaddressLine1] = useState();
  const [addressLine2, setaddressLine2] = useState();
  const [pincode, setpincode] = useState();

  useEffect(() => {
    setFieldValue(props.name, {
      state: s,
      city,
      addressLine1,
      addressLine2,
      pincode,
    });
  }, [state, city, addressLine1, addressLine2, pincode]);


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
  return (
    <Box>
      <Header subtitle={props.field} />
      <TextField
        name="address1"
        value={addressLine1}
        onChange={(e) => {
          setaddressLine1(e.target.value);
        }}
        label="Address Line -1"
        size="small"
        variant="outlined"
        sx={{ width: "100%", maxWidth: "80%", marginY: "15px" }}
      />
      <TextField
        value={addressLine2}
        name="address2"
        onChange={(e) => {
          setaddressLine2(e.target.value);
        }}
        label="Address Line -2"
        size="small"
        variant="outlined"
        sx={{ width: "100%", maxWidth: "80%" }}
      />

      <SelectDropDown
        name="state"
        placeholder="State"
        onSel={(x) => {
          sets(x.label);
          setstate(x);
        }}
        data={stateData}
      />
      <SelectDropDown
        name="city"
        placeholder="City"
        onSel={(x) => setcity(x.label)}
        data={cityData}
      />

      <TextField
        label="Pincode"
        name="pincode"
        value={pincode}
        onChange={(e) => {
          setpincode(e.target.value);
        }}
        size="small"
        variant="outlined"
        sx={{ width: "50%", maxWidth: "40%", marginTop: "15px" }}
      />
    </Box>
  );
};

export default AddressInput;
