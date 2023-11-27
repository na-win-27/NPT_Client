import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
import Store from "../redux/store";
import { getAllSamples } from "../redux/actions/sample.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const columns = [
  {
    field: "date",
    headerName: "Date",
    renderCell:(params)=>{
      return (new Date(params.value).toLocaleDateString())
    },
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    
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
    field: "customer",
    headerName: "Customer",
    width: 250,
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

const Samples = () => {
  React.useEffect(() => {
    Store.dispatch(getAllSamples());
  }, []);
  const data = useSelector((state) => state.sample.samples);

  const rowData=data?data.map((r)=>{
    return{
      _id:r._id,
      date:r.date,
      status:r.status,
      addedBy:r.addedBy.name,
      customer:r.customer.name,
      description:r.description,
      deliveryDetails:r.deliveryDetails
    }
  }):null

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();
  return rowData ? (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Samples" />

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
            backgroundColor: theme.palette.primary[500],
            color: theme.palette.secondary[100],
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
            backgroundColor: theme.palette.secondary[600],
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          onRowClick={(params) => {
            navigate("/sampleDetail", { state: { sample: params.row._id } });
          }}
          loading={false}
          getRowId={(row) => row._id}
          rows={rowData || []}
          columns={columns}
        />
      </Box>
    </Box>
  ) : <Loading/>;
};

export default Samples;
