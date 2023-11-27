import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
} from "@mui/icons-material";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WorkIcon from '@mui/icons-material/Work';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Hangers",
    icon: <ShoppingCartOutlined />,
  },


  {
    text: "Raw-Materials",
    icon: <AddIcon />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  // {
  //   text: "Machines",
  //   icon: <PrecisionManufacturingIcon />,
  // },
  {
    text: "Orders",
    icon: <NoteAddIcon />,
  },
  {
    text: "Samples",
    icon: <CheckroomIcon />,
  },
  {
    text: "New-Quote",
    icon: <NoteAddIcon />,
  },
  {
    text: "Oppurtunity",
    icon: <CrisisAlertIcon />,
  },
  {
    text: "Tasks",
    icon: <WorkIcon />,
  },
];

const Sidebar = ({
    user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[500],
              backgroundColor: theme.palette.primary[900],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary[500]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography textAlign="center" variant="h4" fontWeight="bold">
                    Navin Plastic Tech
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton color="black" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`,{state:{}});
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[500]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[200]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider width="100%" />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile" 
                src={"profilemage"}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[400] }}
                >
                {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[300] }}
                >
         {user.role}
                </Typography>
              </Box>
            
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
