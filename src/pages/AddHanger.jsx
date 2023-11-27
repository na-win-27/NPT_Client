import React from 'react'
import Header from "../components/Header";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddHangerForm from '../components/AddHangerForm';

const AddHanger = () => {
  return (
    <Box m="1.5rem 2.5rem">
    <Box display="flex" flexDirection="column" justifyContent="space-between" >
      <Header title="Add New Hanger Mold" />
      <AddHangerForm/>
    </Box>
  </Box>
  )
}

export default AddHanger