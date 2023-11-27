
import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useNavigate } from "react-router";



import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography
} from "@mui/material";


const Job = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate=useNavigate();

  
  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
    <Header title="Jobs" />
    <Button onClick={() =>navigate('/addJob')} variant="outlined" ><Typography color={theme.palette.secondary[600]}>Add New Job</Typography> </Button>
  </FlexBetween>
    </Box>
  );
};

export default Job;
