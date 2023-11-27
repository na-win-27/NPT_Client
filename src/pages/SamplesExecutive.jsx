import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography
} from "@mui/material";
import Store from "../redux/store";
import { getAllSamples } from "../redux/actions/sample.js";

import { useSelector } from "react-redux";
import {useNavigate} from 'react-router'

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    renderCell: (params) => {
      return params.row.customer.buyerCategory;
    },
  },
  {
    field: "addedBy",
    headerName: "Added By",
    width: 250,
    renderCell: (params) => {
      return params.value.name;
    },
  },
  
  {
    field: "description",
    headerName: "Description",
    width: 250,
    editable: true,
  },
  {
    field: "deliveryDetails",
    headerName: "Delivery Details",
    width: 250,
  },
];

const SamplesExecutive = () => {
  React.useEffect(() => {
    Store.dispatch(getAllSamples());
  }, []);
  const data=useSelector((state)=>state.sample.samples)
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate=useNavigate();
  return data?(
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
    <Header title="Samples" />
    <Button onClick={() => navigate("/addSampleExecutive")} variant="outlined">
      <Typography color={theme.palette.secondary[600]}>
        Add New Sample Request
      </Typography>{" "}
    </Button>
  </FlexBetween>
  <Box
  display="flex"
  mt="40px"
  height="75vh"
  width="100%"
  sx={{
    
    "& .MuiDataGrid-root": {
     width: "100%",
      border: "none",
    },
    "& .MuiDataGrid-cell": {

      backgroundColor:  theme.palette.primary[500],
      color:theme.palette.secondary[100],
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      width: "100%",
      backgroundColor: theme.palette.primary[800],
      color: theme.palette.secondary[100],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiDataGrid-footerContainer": {
      width: "100%",
     backgroundColor:  theme.palette.secondary[600],
      color: theme.palette.secondary[100],
      borderTop: "none",
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${theme.palette.secondary[200]} !important`,
    },
    
  }}
>
  <DataGrid
  onRowClick={(params)=>{
    navigate('/sampleDetailExecutive',{state:{sample:params.row._id}})
  }}
    loading={false}
    getRowId={(row) => row._id}
    rows={ data|| []}
    columns={columns}
  />
</Box>
    </Box>
  ):null;
};

export default SamplesExecutive;
