import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const Layout = () => {
  const user=useSelector((state) => state.user.user) 
  
  
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return user?(
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    
      <Sidebar
        user={user}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  ):null;
};

export default Layout;
