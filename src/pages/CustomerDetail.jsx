import React from "react";
import {
  getCustomerDetails,
  deleteCustomer,
} from "../redux/actions/customer.js";
import Store from "../redux/store";
import { useSelector } from "react-redux";
import _ from "underscore";
import { useTheme } from "@mui/system";
import { Box } from "@mui/system";
import Header from "../components/Header.jsx";
import { Divider, Typography, Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { setCustomer } from "../redux/actions/oppurtunity.js";
import FlexBetween from "../components/FlexBetween.jsx";
import { useLocation } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomerDetail = () => {
  const location = useLocation();
  let query = useQuery();

  const navigate = useNavigate();
  const theme = useTheme();
  const customerId = useSelector((state) => state.customer.customerDetailId);
  const customerDetail = useSelector(
    (state) => state.customer.customerDetail,
    _.isEqual
  );
  React.useEffect(() => {
    Store.dispatch(getCustomerDetails(customerId || ""));
  });

  const [expanded, setExpanded] = React.useState(true);
  const [contactExpand, setContactExpand] = React.useState(true);
  const [merchantcontactExpand, setMerchantContactExpand] =
    React.useState(false);
  const [accountscontactExpand, setAccountContactExpand] =
    React.useState(false);
  const [purchasecontactExpand, setPurchaseContactExpand] =
    React.useState(false);
  const [logisticExpand, setLogisticExpand] = React.useState(false);
  const [taxExpand, setTaxExpand] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [del, setDel] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return customerDetail && location ? (
    <Box marginTop="30px">
      {query.get("mode") ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {query.get("mode") === "edit"
              ? "Edited Succesfully"
              : "Added SuccessFully"}
          </Alert>
        </Snackbar>
      ) : null}
      <Dialog
        open={del}
        onClose={() => setDel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure Wanna Delete {customerDetail.name} ??
        </DialogTitle>

        <DialogActions>
          <Button color="primary" onClick={() => setDel(false)}>
            Disagree
          </Button>
          <Button
            color="error"
            onClick={() => {
              Store.dispatch(deleteCustomer(customerDetail._id));
              navigate("/customers?mode=delete");
              setDel(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <FlexBetween>
        <Header
          style={{ marginLeft: "10px" }}
          title={customerDetail.name || ""}
        />
        <div>
          <Button
            onClick={() => {
              navigate("/editCustomer", { state: { customerDetail } });
            }}
          >
            Edit Customer Info
          </Button>
          <Button
            onClick={() => {
              setDel(true);
            }}
          >
            Delete Customer{" "}
          </Button>
        </div>
      </FlexBetween>
      <Divider />
      <Box display="grid" gridTemplateColumns="2fr 6fr">
        <Box height="100vh" bgcolor={theme.palette.secondary[100]}>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">CONTACT</Typography>
            <ExpandMore
              expand={contactExpand}
              onClick={() => setContactExpand(!contactExpand)}
              aria-expanded={contactExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={contactExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.contactName}</Typography>
            <Typography>{customerDetail.phoneNumber}</Typography>
            <Typography>{customerDetail.email}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">ADDRESS</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <Typography variant="h5">Shipping Address</Typography>
            <Typography>
              {customerDetail.shippingAddress.addressLine1}
            </Typography>
            <Typography>
              {customerDetail.shippingAddress.addressLine2}
            </Typography>
            <Typography>
              {customerDetail.shippingAddress.state || ""}
            </Typography>
            <Typography>{customerDetail.shippingAddress.city || ""}</Typography>
            <Typography>{customerDetail.shippingAddress.pinCode}</Typography>

            <Typography style={{ marginTop: "20px" }} variant="h5">
              Billing Address
            </Typography>
            <Typography>
              {customerDetail.billingAddress.addressLine1}
            </Typography>
            <Typography>
              {customerDetail.billingAddress.addressLine2}
            </Typography>
            <Typography>{customerDetail.billingAddress.city || ""}</Typography>
            <Typography>{customerDetail.billingAddress.state || ""}</Typography>
            <Typography></Typography>
            <Typography>{customerDetail.billingAddress.pinCode}</Typography>
          </Collapse>

          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">MERCHANDISER CONTACT</Typography>
            <ExpandMore
              expand={merchantcontactExpand}
              onClick={() => setMerchantContactExpand(!merchantcontactExpand)}
              aria-expanded={merchantcontactExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={merchantcontactExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.merchandiser.name}</Typography>
            <Typography>{customerDetail.merchandiser.number || ""}</Typography>
            <Typography>{customerDetail.merchandiser.email}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">ACCOUNTS CONTACT</Typography>
            <ExpandMore
              expand={accountscontactExpand}
              onClick={() => setAccountContactExpand(!accountscontactExpand)}
              aria-expanded={accountscontactExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={accountscontactExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.accountant.name}</Typography>
            <Typography>{customerDetail.accountant.number || ""}</Typography>
            <Typography>{customerDetail.accountant.email}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">PURCHASE CONTACT</Typography>
            <ExpandMore
              expand={purchasecontactExpand}
              onClick={() => setPurchaseContactExpand(!purchasecontactExpand)}
              aria-expanded={purchasecontactExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={purchasecontactExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.purchase.name}</Typography>
            <Typography>{customerDetail.purchase.number || ""}</Typography>
            <Typography>{customerDetail.purchase.email}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">LOGISTICS TERMS</Typography>
            <ExpandMore
              expand={logisticExpand}
              onClick={() => setLogisticExpand(!logisticExpand)}
              aria-expanded={logisticExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={logisticExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.transporter.name}</Typography>
            <Typography>{customerDetail.transporter.terms || ""}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">TAX INFORMATION</Typography>
            <ExpandMore
              expand={taxExpand}
              onClick={() => setTaxExpand(!taxExpand)}
              aria-expanded={taxExpand}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse
            style={{ marginLeft: "20px" }}
            in={taxExpand}
            timeout="auto"
            unmountOnExit
          >
            <Typography>{customerDetail.gstin}</Typography>
            <Typography>{customerDetail.paymentTerms || ""}</Typography>
          </Collapse>
        </Box>
        <Box
          margin="10px"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          height="30px"
        >
          <Button
            style={{ marginRight: 20 }}
            onClick={() => {
              navigate("/addOppurtunity",{state:{customer:customerDetail}});
            }}
            variant="contained"
          >
            New Oppurtunity
          </Button>{" "}
          <Button variant="contained">New Order</Button>
        </Box>
      </Box>
    </Box>
  ) : (<Box>Error in loading
    <Button onClick={()=>navigate('/customers')}>Click Here</Button>
    </Box>);
};

export default CustomerDetail;
