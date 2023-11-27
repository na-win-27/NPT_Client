import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ style,title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box style={style}>
      <Typography
        variant="h2"
        color={theme.palette.secondary[800]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography fontWeight="bold" variant="h5" color={theme.palette.secondary[900]}>
        {subtitle}
      </Typography>
      </Box>
  );
};

export default Header;
