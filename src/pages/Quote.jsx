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
import {  getAllQuotes } from "../redux/actions/quote.js";
import Store from "../redux/store";
import {useSelector} from 'react-redux'
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";


const columns = [
  {
    field: "date",
    headerName: "Date",
    flex: 0.5,
  },
  {
    field: "quoteNo",
    headerName: "Quote Number",
    flex: 0.5,
  },
  {
    field: "customer",
    headerName: "Customer Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.5,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.5,
  },

  {
    field: "revised",
    headerName: "Revised",
    flex: 0.5,
  },
];


const Quotes = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  React.useEffect(() => {
    Store.dispatch(getAllQuotes());
  }, []);


  const data=useSelector((state)=>state.quote.quotes)

  const rowData=data?data.map((r)=>{
    return{
      _id:r._id,
      date:r.date,
      quoteNo:r.quoteNo,
      customer:r.customer.name,
      email:r.customer.email,
      phoneNumber:r.customer.phoneNumber,
      revised:r.revised,
    }
  }):null
  return rowData?(
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
    <Header title="Rate-Quotes" />
    
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
    navigate('/quoteDetail',{state:{id:params.row._id}})
  }}
    loading={false}
    getRowId={(row) => row._id}
    rows={rowData||[]}
    columns={columns}
  />
</Box>
    </Box>
  ):<Loading/>;
};

export default Quotes;
