import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useField, useFormikContext } from "formik";


export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field,meta] = useField(props);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DatePicker']}>
    <DatePicker
    format="DD-MM-YYYY"
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
    {meta.error && <span style={{color:"red"}}> Please select date</span>}

      </DemoContainer>
    </LocalizationProvider>
  );
};


