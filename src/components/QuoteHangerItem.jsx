import React from "react";
import { Typography } from "@mui/material";
import logo from "../assets/img-20200618-wa0238-90x90.webp";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import { View } from "@react-pdf/renderer";

const QuoteHangerItem = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "70px",
        marginRight: "30px",
        marginTop: "30px",
      }}
    >
      <Text>1</Text>
      <Text>CL-28</Text>
      <Text>PP:BLACK</Text>
      <Box>
        <CardMedia component="img" height="50px" image={logo} alt="NPT LOGO" />
      </Box>
      <Text>54025210</Text>
      <Text>12</Text>
    </View>
  );
};

export default QuoteHangerItem;
