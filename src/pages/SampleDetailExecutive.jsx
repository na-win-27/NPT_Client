import React from "react";
import { getSampleById } from "../redux/actions/sample.js";
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
import { useLocation } from "react-router";
import SampleHangerCard from "../components/SampleHangerCard.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { ProgressBar } from "react-loader-spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const SampleDetailExecutive = () => {
  const theme = useTheme();
  const location = useLocation();
  const sampleId = location.state.sample;
  React.useEffect(() => {
    Store.dispatch(getSampleById(sampleId));
   
    
  }, []);

  const sample = useSelector((state) => state.sample.sample, _.isEqual);

  const [open, setOpen] = React.useState(false);
  const [del, setDel] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = React.useState(true);
  const [contactExpand, setContactExpand] = React.useState(true);
  const [merchantcontactExpand, setMerchantContactExpand] =
    React.useState(false);

  return sample ? (
    <Box mt="10px">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <TextField
              value={del}
              onChange={(e) => setDel(e.target.value)}
              label="Add Delivery Details"
              multiline
              rows={3}
              variant="outlined"
            />
            <Button
              onClick={() => {
                setOpen(false);
              }}
              variant="contained"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <FlexBetween>
        <Header
          style={{ marginLeft: "10px" }}
          title={"Sample for :" + sample.customer.name || ""}
        />
        {sample.status === "Open" ? (
          <Button
            onClick={handleOpen}
            style={{ marginRight: "10px" }}
            variant="outlined"
          >
            Add Status
          </Button>
        ) : (
          <Box marginRight="30px">
            <Typography variant="h6">Delivery details</Typography>
            <Typography variant="h5">{sample.deliveryDetails}</Typography>
          </Box>
        )}
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
            <Typography>{sample.customer.contactName}</Typography>
            <Typography>{sample.customer.phoneNumber}</Typography>
            <Typography>{sample.customer.email}</Typography>
          </Collapse>
          <Box marginLeft="20px" marginTop="10px" display="flex">
            <Typography variant="h4">ADDRESS</Typography>
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
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
              {sample.customer.shippingAddress.addressLine1}
            </Typography>
            <Typography>
              {sample.customer.shippingAddress.addressLine2}
            </Typography>
            <Typography>
              {sample.customer.shippingAddress.state.label || ""}
            </Typography>
            <Typography>
              {sample.customer.shippingAddress.city.label || ""}
            </Typography>
            <Typography>{sample.customer.shippingAddress.pinCode}</Typography>
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
            <Typography>{sample.customer.merchandiser.name}</Typography>
            <Typography>{sample.customer.merchandiser.number || ""}</Typography>
            <Typography>{sample.customer.merchandiser.email}</Typography>
          </Collapse>
        </Box>
        <Box margin="10px" display="grid" gridTemplateColumns="3fr 3fr">
          {sample.hangers.map((hanger) => {
            return <SampleHangerCard hanger={hanger} />;
          })}
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

export default SampleDetailExecutive;
