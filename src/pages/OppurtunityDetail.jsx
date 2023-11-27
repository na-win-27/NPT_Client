import React from "react";
import { Box, useTheme, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import FlexBetween from "../components/FlexBetween";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CollaspseView from "../components/CollaspseView";
import HangerCard from "../components/HangerCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotePdf from "../components/QuotePdf";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../components/Loading"

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

const OppurtunityDetail = () => {
  const theme = useTheme();
  const [sampleExpand, setSampleExpand] = React.useState(true);
  const [quoteExpand, setQuoteExpand] = React.useState(false);
  const navigate = useNavigate();
  const data = useSelector((state) => {
    return {
      oppurtunityDetail: state.oppurtunity.oppurtunity,
      loading: state.oppurtunity.opurtunityLoading,
    };
  });
  const { loading, oppurtunityDetail } = data;

  const [open, setOpen] = React.useState(true);
  const [del, setDel] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let query = useQuery();
  
  return !loading ? (
    oppurtunityDetail ? (
      <Box m="1rem">
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
          Are You Sure Wanna Delete  ??
        </DialogTitle>

        <DialogActions>
          <Button color="primary" onClick={() => setDel(false)}>
            Disagree
          </Button>
          <Button
            color="error"
            onClick={() => {
              // Store.dispatch(deleteCustomer(oppurtunityDetail._id));
              navigate("/oppurtunities?mode=delete");
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
            title={oppurtunityDetail.customer.name}
            subtitle={oppurtunityDetail.description}
          />
          <FlexBetween>
            <Button
              
              onClick={() =>
                navigate("/addSample", {
                  state: { oppurtunity: oppurtunityDetail },
                })
              }
            >
              Add Sample
            </Button>

          


            <Button
              
              onClick={() =>
                navigate("/addQuote", {
                  state: { oppurtunity: oppurtunityDetail },
                })
              }
            >
              Add Quote
            </Button>
            <Button
             
              onClick={() =>
                navigate("/addOrder", {
                  state: { oppurtunity: oppurtunityDetail },
                })
              }
            >
              Add Order
            </Button>

           

          <Button
        
          color="warning"
          onClick={() => {
            navigate("/editOppurtunity", { state: { oppurtunityDetail } });
          }}
        >
          Edit
        </Button>

        <Button
       
        color="error"
        onClick={() => {
          setDel(true);
        }}
      >
        Delete
      </Button>
          </FlexBetween>
        </FlexBetween>
        <Header
          subtitle={"   Buyer Category: " + oppurtunityDetail.buyerCategory}
        />
        <Header subtitle={"   Reffered By: " + oppurtunityDetail.refferedBy} />
        <Box>
          <Box height="100vh" marginTop="50px">
            <Box marginLeft="20px" marginTop="50px" display="flex">
              <Typography variant="h3">Samples</Typography>
              <ExpandMore
                expand={sampleExpand}
                onClick={() => setSampleExpand(!sampleExpand)}
                aria-expanded={sampleExpand}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
            <Collapse
              style={{ marginLeft: "20px" }}
              in={sampleExpand}
              timeout="auto"
              unmountOnExit
            >
              {oppurtunityDetail.sampleRequest.map((sample) => {
                return (
                  <CollaspseView key={sample._id} name={sample._id}>
                    Status:{sample.status}
                    {sample.hangers.map((hanger) => {
                      return (
                        <HangerCard
                        key={hanger._id}
                          hanger={hanger.id}
                          size={75}
                          quantity={hanger.quantity}
                          colour={hanger.colour.name}
                        />
                      );
                    })}
                  </CollaspseView>
                );
              })}
            </Collapse>

            <Box marginLeft="20px" marginTop="50px" display="flex">
              <Typography variant="h3">Quotes</Typography>
              <ExpandMore
                expand={quoteExpand}
                onClick={() => setQuoteExpand(!quoteExpand)}
                aria-expanded={quoteExpand}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
            <Collapse
              style={{ marginLeft: "20px" }}
              in={quoteExpand}
              timeout="auto"
              unmountOnExit
            >
              {oppurtunityDetail.quotes.map((quote) => {
                return (
                  <CollaspseView key={quote._id} name={quote._id}>
                    <PDFDownloadLink
                      document={<QuotePdf quote={quote} />}
                      fileName="somename.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading
                          ? "Loading document..."
                          : "Click Here To Download"
                      }
                    </PDFDownloadLink>
                  </CollaspseView>
                );
              })}
            </Collapse>
          </Box>
        </Box>
      </Box>
    ) : (
      <Box>Error in loading
      <Button onClick={()=>navigate('/oppurtunity')}>Click Here</Button>
      </Box>
    )
  ) : (
    <Loading />
  );
};

export default OppurtunityDetail;
