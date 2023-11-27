import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
import { getAllCustomers, setCustomerId } from "../redux/actions/customer.js";
import Store from "../redux/store";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";
import { useLocation } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}



const columns = [
  {
    field: "name",
    headerName: "Name",
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
    field: "buyerCategory",
    headerName: "Buyer Category",
    flex: 0.5,
  },

  {
    field: "gstin",
    headerName: "GSTIN",
    flex: 0.5,
  },

  {
    field: "paymentTerms",
    headerName: "Payment Terms",
    flex: 0.5,
  },

  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
  },
];

const Customers = () => {
  let query = useQuery();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  React.useEffect(() => {
    Store.dispatch(getAllCustomers());
  }, []);

  const customer = useSelector((state) => state.customer.customers);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return customer ? (
    <Box m="1.5rem 2.5rem">
    {query.get("mode")? (
    
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {query.get("mode")==="delete"
            ? "Deleted Succesfully"
            : "Data  Fetched"}
        </Alert>
      </Snackbar>
    ) :null}
      <FlexBetween>
        <Header title="Customers" />
        <Button onClick={() => navigate("/addCustomer")} variant="outlined">
          <Typography color={theme.palette.secondary[600]}>
            Add New Customer
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
            Store.dispatch(setCustomerId(params.row._id));
            navigate("/customerDetail");
          }}
          loading={false}
          getRowId={(row) => row._id}
          rows={customer || []}
          columns={columns}
        />
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

export default Customers;
