import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import {
  Login,
  Dashboard,
  AddCustomer,
  Customers,
  AddOppurtunity,
  Hangers,
  Job,
  Oppurtunity,
  Machines,
  Employees,
  Orders,
  Quotes,
  RawMaterial,
  Samples,
  CustomerDetail,
  AddHanger,
  AddRawMaterial,
  AddSample,
  AddQuote,
  Addorder,
  OppurtunityDetail,
  OrderDetail,
  SampleDetail,
  SampleDetailExecutive,
  SamplesExecutive,
  QuoteDetail,
  Tasks,
} from "./Routes.js";

import { loadUser } from "./redux/actions/user";
import Store from "./redux/store";
import { themeSettings } from "./theme";
import React, { useEffect } from "react";
import { useMemo } from "react";
import Layout from "./layout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute";
import { useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import ExecutiveRoute from "./components/ExecutiveRoute";

function App() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return user.loading ? (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <ThreeCircles height="200" width="300" radius="9" color="#FE6E0C" />
    </Box>
  ) : (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user.error ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/Dashboard" />
              )
            }
          />
          <Route element={<Layout />}>
            <Route
              path="/Dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Hangers"
              element={
                <AuthenticatedRoute>
                  <Hangers />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <AuthenticatedRoute>
                  <Tasks />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addCustomer"
              element={
                <AuthenticatedRoute>
                  <AddCustomer />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editCustomer"
              element={
                <AuthenticatedRoute>
                  <AddCustomer />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/orderDetail"
              element={
                <AuthenticatedRoute>
                  <OrderDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/quoteDetail"
              element={
                <AuthenticatedRoute>
                  <QuoteDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/sampleDetail"
              element={
                <AuthenticatedRoute>
                  <SampleDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addRawMaterial"
              element={
                <AuthenticatedRoute>
                  <AddRawMaterial />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addOrder"
              element={
                <AuthenticatedRoute>
                  <Addorder />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editOrder"
              element={
                <AuthenticatedRoute>
                  <Addorder />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addQuote"
              element={
                <AuthenticatedRoute>
                  <AddQuote />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editQuote"
              element={
                <AuthenticatedRoute>
                  <AddQuote />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addOppurtunity"
              element={
                <AuthenticatedRoute>
                  <AddOppurtunity />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editOppurtunity"
              element={
                <AuthenticatedRoute>
                  <AddOppurtunity />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addHanger"
              element={
                <AuthenticatedRoute>
                  <AddHanger />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/addSample"
              element={
                <AuthenticatedRoute>
                  <AddSample />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editSample"
              element={
                <AuthenticatedRoute>
                  <AddSample />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Employees"
              element={
                <AuthenticatedRoute>
                  <Employees />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Job"
              element={
                <AuthenticatedRoute>
                  <Job />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Raw-Materials"
              element={
                <AuthenticatedRoute>
                  <RawMaterial />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Customers"
              element={
                <AuthenticatedRoute>
                  <Customers />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/customerDetail"
              element={
                <AuthenticatedRoute>
                  <CustomerDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/oppurtunityDetail"
              element={
                <AuthenticatedRoute>
                  <OppurtunityDetail />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/Machines"
              element={
                <AuthenticatedRoute>
                  <Machines />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/Orders"
              element={
                <AuthenticatedRoute>
                  <Orders />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/New-Quote"
              element={
                <AuthenticatedRoute>
                  <Quotes />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/oppurtunity"
              element={
                <AuthenticatedRoute>
                  <Oppurtunity />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/samples"
              element={
                <AuthenticatedRoute>
                  <Samples />
                </AuthenticatedRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <UnAuthenticatedRoute>
                <Login />
              </UnAuthenticatedRoute>
            }
          />
          <Route
            path="/SamplesExecutive"
            element={
              <ExecutiveRoute>
                <SamplesExecutive />
              </ExecutiveRoute>
            }
          />
          <Route
            path="/sampleDetailExecutive"
            element={
              <ExecutiveRoute>
                <SampleDetailExecutive />
              </ExecutiveRoute>
            }
          />
          <Route
            path="/addSampleExecutive"
            element={
              <ExecutiveRoute>
                <AddSample />
              </ExecutiveRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
