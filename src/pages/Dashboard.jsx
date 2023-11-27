import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, useMediaQuery, Button } from "@mui/material";
import { getAllOppurtunities } from "../redux/actions/oppurtunity.js";
import { getAllOrders } from "../redux/actions/order.js";
import { setOppurtunityId } from "../redux/actions/oppurtunity.js";
import Store from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ProgressBar } from "react-loader-spinner";

const columns = [
  {
    field: "customer",
    headerName: "Customer Name",
    width: 120,
  },
  {
    field: "buyerCategory",
    headerName: "Buyer Catergory",
    width: 110,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  React.useEffect(() => {
    Store.dispatch(getAllOppurtunities());
    Store.dispatch(getAllOrders());
  }, []);
  const data = useSelector((state) => {
    return {
      oppurtunities: state.oppurtunity.oppurtunities,
      orders: state.order.orders,
    };
  });

  const discus = [];
  const sampl = [];
  const quote = [];

  if (data.oppurtunities) {
    data.oppurtunities.map((op) => {
      if (op.stage === "Discussions") {
        discus.push({
          _id: op._id,
          customer: op.customer.name,
          buyerCategory: op.customer.buyerCategory,
          description: op.description,
        });
      } else if (op.stage === "Sample") {
        sampl.push({
          _id: op._id,
          customer: op.customer.name,
          buyerCategory: op.customer.buyerCategory,
          description: op.description,
        });
      } else if (op.stage === "Quote") {
        quote.push({
          _id: op._id,
          customer: op.customer.name,
          buyerCategory: op.customer.buyerCategory,
          description: op.description,
        });
      }
    });
  }
  return data.oppurtunities && data.orders ? (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" />
      </FlexBetween>
      <Box
        display="grid"
        gridTemplateColumns="5fr 5fr"
        justifyContent="stretch"
        alignItems="stretch"
      >
        <Box sx={{ height: 400, width: "400px", margin: "20px" }}>
          <Header subtitle="Quick Links" />
          <Box
            display="flex"
            flexDirection="column"
            height={150}
            mt={5}
            justifyContent="space-between"
          >
            <Button variant="outlined" onClick={()=>navigate('/addSample')} style={{ minWidth: "100px", minHeight: "60px" ,textSize:"20",marginTop:"10px" }}>
              ADD NEW SAMPLE REQUEST
            </Button>
            <Button variant="outlined" onClick={()=>navigate('/addQuote')}  style={{ minWidth: "100px", minHeight: "60px" ,textSize:"20",marginTop:"10px"  }}>
            ADD NEW PRICE QUOTE REQUEST</Button>
            <Button  variant="outlined" onClick={()=>navigate('/addOrder')} style={{ minWidth: "100px", minHeight: "60px" ,textSize:"20",marginTop:"10px"  }}>
            ADD NEW ORDER</Button>
          </Box>
        </Box>
        <Box sx={{ height: 400, width: "400px", margin: "20px" }}>
          <Header subtitle="Discussions" />
          <DataGrid
            onRowClick={(params) => {
              Store.dispatch(
                setOppurtunityId(
                  data.oppurtunities.find((r) => r._id === params.row._id)
                )
              );
              navigate("/oppurtunityDetail");
            }}
            getRowId={(row) => row._id}
            rows={discus}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
        <Box sx={{ height: 400, width: "400px", margin: "20px" }}>
          <Header subtitle="Samples" />
          <DataGrid
            onRowClick={(params) => {
              Store.dispatch(
                setOppurtunityId(
                  data.oppurtunities.find((r) => r._id === params.row._id)
                )
              );
              navigate("/oppurtunityDetail");
            }}
            getRowId={(row) => row._id}
            rows={sampl}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
        <Box sx={{ height: 400, width: "400px", margin: "20px" }}>
          <Header subtitle="Quote Sent" />
          <DataGrid
            onRowClick={(params) => {
              Store.dispatch(
                setOppurtunityId(
                  data.oppurtunities.find((r) => r._id === params.row._id)
                )
              );
              navigate("/oppurtunityDetail");
            }}
            getRowId={(row) => row._id}
            rows={quote}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#FE6E0C"
        barColor="#0F3137"
      />
    </Box>
  );
};

export default Dashboard;
