import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CustomTabPanel from "../components/CustomTabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Store from "../redux/store";
import { getMaterialsByCategory } from "../redux/actions/rawMaterial.js";
import { useSelector } from "react-redux";
import MaterialCard from "../components/MaterialCard";
import { ProgressBar } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation } from "react-router";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "stock",
    headerName: "Stock Available",
    flex: 0.5,
  },
  {
    field: "minStock",
    headerName: "Minimum Stock",
    flex: 0.5,
  },
];

const categories = [
  "material",
  "clip",
  "hook",
  "print",
  "masterBatch",
  "cartonBox",
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RawMaterial = () => {

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  let query = useQuery();

  React.useEffect(() => {
    Store.dispatch(getMaterialsByCategory(categories[value]));
  }, []);

  const handleChange = (event, newValue) => {
    Store.dispatch(getMaterialsByCategory(categories[newValue]));
    setValue(newValue);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const materialsByCategory = useSelector(
    (state) => state.rawMaterial.materialsByCategory
  );
  const loading = useSelector((state) => state.rawMaterial.materialsLoading);

  return !loading ? (
    materialsByCategory ? (
      
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
          <Header title="Raw Materials" />
          <Button
            onClick={() => navigate("/addRawMaterial")}
            variant="outlined"
          >
            <Typography color={theme.palette.secondary[600]}>
              Add New Material
            </Typography>{" "}
          </Button>
        </FlexBetween>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Materials" {...a11yProps(0)} />
              <Tab label="Clips" {...a11yProps(1)} />
              <Tab label="Hooks" {...a11yProps(2)} />
              <Tab label="Printing" {...a11yProps(3)} />
              <Tab label="Master Batches" {...a11yProps(4)} />
              <Tab label="Carton Boxes" {...a11yProps(5)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={value}>
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
              // Store.dispatch(setCustomerId(params.row._id));
              // navigate("/customerDetail");
            }}
            loading={false}
            getRowId={(row) => row._id}
            rows={materialsByCategory || []}
            columns={columns}
          />
        </Box>
          </CustomTabPanel>
        </Box>
      </Box>
    ) : (
      <Box>Error</Box>
    )
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

export default RawMaterial;
