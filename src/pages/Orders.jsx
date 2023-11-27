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
import { getAllOrders } from "../redux/actions/order.js";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router'
import Loading from "../components/Loading";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 200,

  },
  {
    field: "supplyDate",
    headerName: "Supply Date",
    width: 200,

  },
  {
    field: "customer",
    headerName: "Customer Name",
    width: 300,
  },
 
  {
    field: "buyerCategory",
    headerName: "Buyer Catergory",
    width: 200,
  },

  {
    field: "paymentTerms",
    headerName: "Payment Terms",
    width: 200,
  
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
    editable: true,
  },
];


const Orders = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate=useNavigate();
  React.useEffect(() => {
    Store.dispatch(getAllOrders());
  }, []);
  const data = useSelector((state) => state.order.orders);


  const rowData=data?data.map((r)=>{
    return ({
      _id:r._id,
      date:r.date,
      customer:r.customer.name,
      buyerCategory:r.customer.buyerCategory,
      paymentTerms:r.customer.paymentTerms,
      description:r.subject,
      supplyDate:r.supplyDate,
    })
  }):null;

  return rowData?(
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
    <Header title="Orders" />
    <Button onClick={() => navigate("/addOrder")} variant="outlined">
      <Typography color={theme.palette.secondary[600]}>
        Add New Order
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
    navigate('/orderDetail',{state:{order:params.row._id}})
  }}
    loading={false}
    getRowId={(row) => row._id}
    rows={ rowData|| []}
    columns={columns}
  />
</Box>
    </Box>
  ):<Loading/>;
};

export default Orders;
