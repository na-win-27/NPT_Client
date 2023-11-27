import React from 'react'
import Header from "../components/Header";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddRawMaterialForm from '../components/AddRawMaterialForm';

const AddRawMaterial = () => {
  return (
    <Box m="1.5rem 2.5rem">
    <Box display="flex" flexDirection="column" justifyContent="space-between" >
      <Header title="Add New Material" />
      <AddRawMaterialForm/>
    </Box>
  </Box>
  )
}

export default AddRawMaterial