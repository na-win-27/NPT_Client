import React from 'react'
import { useLocation } from 'react-router'
import Header from '../components/Header';
import { Box,Button } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {useNavigate} from 'react-router'
import Store from '../redux/store';
import { getOrderById } from '../redux/actions/order';
import FlexBetween from '../components/FlexBetween';
import { useSelector } from 'react-redux';


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const options = {
    title: "List of Hangers in order",
    chartArea: { width: "65%", height: "80%" },
    hAxis: {
      title: "pcs",
      minValue: 0,
    },
    vAxis: {
      title: "Hangers",
    },
  };



const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "grey",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  
const OrderDetail = () => {
  const navigate=useNavigate();
  let query = useQuery();
    const location = useLocation()
   const data = useSelector((state)=>state.order.order)

   const cData = [["Elastic", "Order Quantity", "Packed Quantity"]];
  let subTilte = "";


  React.useEffect(() => {
    if (!query.get("mode")) {
  
      Store.dispatch(getOrderById(location.state.order));
    }
  }, []);

  const [del, setDel] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };





  return data? (
    <Box m="1.5rem 2.5rem">
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
      Are You Sure Wanna Delete ??
    </DialogTitle>

    <DialogActions>
      <Button color="primary" onClick={() => setDel(false)}>
        Disagree
      </Button>
      <Button
        color="error"
        onClick={() => {
          // Store.dispatch(deleteCustomer(customerDetail._id));
          // navigate("/customers?mode=delete");
          // setDel(false);
        }}
        autoFocus
      >
        Agree
      </Button>
    </DialogActions>
  </Dialog>
    <FlexBetween>
      <Header title={data.customer.name}  subtitle={`Order No:${data.orderNo} 
      Ordered on:${data.date} 
      to be supplied on/before ${data.supplyDate}`} />
      <div>
      <Button
        color="warning"
        onClick={() => {
          navigate("/editOrder", { state: { order:data } });
        }}
        style={{ marginRight: "10px" }}
      >
        Edit Request
      </Button>
      <Button
        color="error"
        onClick={() => {
          setDel(true);
        }}
        style={{ marginRight: "10px" }}
      >
        Delete Request
      </Button>
    </div>
      </FlexBetween>
      </Box>
  ):(<Box>Error in loading
    <Button onClick={()=>navigate('/orders')}>Click Here</Button>
    </Box>);
}

export default OrderDetail