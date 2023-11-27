import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
import { getAllHangers, getHangerByCategory } from "../redux/actions/hanger.js";
import HangerCard from "../components/HangerCard";
import Pagination from "@mui/material/Pagination";
import CustomTabPanel from "../components/CustomTabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Store from "../redux/store";
import { ProgressBar } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const categories = [
  "TOP-PH",
  "TOP-MH",
  "OUTERWEAR",
  "FRAME",
  "BOTTOM",
  "SET",
  "HOME-TEXTILE",
  "MULTIPACK",
  "SIZER",
  "INNERWEAR",
  "BELT",
  "NAVIN-HOOKS",
  "SHINE-HOOKS",
  "FOOTWEAR"
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Hangers = () => {
  let query = useQuery();


  const location = useLocation();
  const [value, setValue] = React.useState(0);



  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    Store.dispatch(getHangerByCategory(categories[newValue]))
    setValue(newValue);
  };
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();
  React.useEffect(() => {
    Store.dispatch(getHangerByCategory("TOP-PH"));
  }, []);

  const hangers = useSelector((state) => state.hanger.hangersByCategory);
  const loading = useSelector((state) => state.hanger.hangersLoading);


  return !loading ? (
    hangers?(
      
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
      <FlexBetween>
        <Header title="Hangers" />
        <Button onClick={() => navigate("/addHanger")} variant="outlined">
          <Typography color={theme.palette.secondary[600]}>
            Add New Hanger Mold
          </Typography>{" "}
        </Button>
      </FlexBetween>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Hanger Categories"
            >
              <Tab label="TOP-PH" {...a11yProps(0)} />
              <Tab label="TOP-MH" {...a11yProps(1)} />
              <Tab label="OUTERWEAR" {...a11yProps(2)} />
              <Tab label="FRAME" {...a11yProps(3)} />
              <Tab label="BOTTOM" {...a11yProps(4)} />
              <Tab label="SET" {...a11yProps(5)} />
              <Tab label="HOME TEXTILE" {...a11yProps(6)} />
              <Tab label="MULTIPACK" {...a11yProps(7)} />
              <Tab label="SIZER" {...a11yProps(8)} />
              <Tab label="INNERWEAR" {...a11yProps(9)} />
              <Tab label="BELT" {...a11yProps(10)} />
              <Tab label="NAVIN HOOKS" {...a11yProps(11)} />
              <Tab label="SHINE HOOKS" {...a11yProps(12)} />
              <Tab label="FOOTWEAR" {...a11yProps(13)} />
            </Tabs>
          </Box>
          
          <CustomTabPanel value={value} index={value}>
            <Box display="grid" gridTemplateColumns="3fr 3fr 3fr 3fr">
              {hangers.map((h) => {
                return <HangerCard key={h._id} hanger={h} det={true} />;
              })}
            </Box>
          </CustomTabPanel>
        </Box>
        <Pagination
          count={8}
          style={{ marginLeft: "700px" }}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </Box>
  ):(<Box>
  ERROR RECIEVED
  </Box> )): (
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

export default Hangers;
