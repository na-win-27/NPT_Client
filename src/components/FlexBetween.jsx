const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({
  display: "flex",
  padding:5,
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
