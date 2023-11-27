import React from "react";
import QuotePdf from "../components/QuotePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router";
import Store from "../redux/store";
import { getQuoteById } from "../redux/actions/quote.js";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import FlexBetween from "../components/FlexBetween";
import Loading from "../components/Loading";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {Box} from "@mui/material"

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QuoteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let query = useQuery();

  React.useEffect(() => {
    if (!query.get("mode")) {
      Store.dispatch(getQuoteById(location.state.id));
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

  const qDetail = useSelector((state) => state.quote.quote);

  

  return qDetail ? (
    <div>
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
        <Header title="Quote Detail" />
        <div>
          <Button
            color="warning"
            onClick={() => {
              navigate("/editQuote", { state: { qDetail } });
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
      <PDFDownloadLink
        document={<QuotePdf quote={qDetail} />}
        fileName="quote.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Loading />
          ) : (
            <Button variant="outlined">Download Now</Button>
          )
        }
      </PDFDownloadLink>
      <PDFViewer width={"100%"} height={"900"}>
        <QuotePdf quote={qDetail} />
      </PDFViewer>
    </div>
  ) : (<Box>Error in loading
    <Button onClick={()=>navigate('/new-quote')}>Click Here</Button>
    </Box>);;
};

export default QuoteDetail;
