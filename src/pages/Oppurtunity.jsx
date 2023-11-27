import React from "react";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  getAllOppurtunities,
  setOppurtunityId,
} from "../redux/actions/oppurtunity.js";
import Store from "../redux/store";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const columns = [
  {
    field: "stage",
    headerName: "Stage",
    flex: 1,
  },
  {
    field: "customer",
    headerName: "Customer Name",
    flex: 0.5,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "refferedBy",
    headerName: "Referral",
    flex: 0.4,
  },
];

const Oppurtunity = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  React.useEffect(() => {
    Store.dispatch(getAllOppurtunities());
  }, []);

  const data = useSelector((state) => state.oppurtunity.oppurtunities);


  const rowData=data?data.map((r)=>{
    return{
      _id:r._id,
      customer:r.customer.name,
      stage:r.stage,
      description:r.description,
      refferedBy:r.refferedBy,
    }
  }):null

  return rowData?(
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Oppurtunities" />
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
            Store.dispatch(setOppurtunityId(data.find((r)=>r._id===params.row._id)));
            navigate("/oppurtunityDetail");
          }}
          loading={false}
          getRowId={(row) => row._id}
          rows={rowData || []}
          columns={columns}
        />
      </Box>
    </Box>
  ):<Loading/>;
};

export default Oppurtunity;
