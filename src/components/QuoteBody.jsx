import { useState } from "react";
import { Box } from "@mui/system";
import React from "react";
import {  Typography } from "@mui/material";




const QuoteBody = (props) => {
  const { hanger, clips, hook, print, material } = props.data;
  return (
    <Box>
      <Box>
      </Box>
      {hanger != null && material != null ? (
        <Box>
          Material Cost:
          {material.materialCategory === "PP" ||
          material.materialCategory === "LD"
            ? (hanger.totalWeight * material.price) / 1000
            : (hanger.totalWeight*1.188* material.price) / 1000}
          <br />
        </Box>
      ) : null}
      {hook != null ? <Box>Hook Cost:{hook.price}</Box> : null}
      {clips != null ? (
        <Box>Auxilaary Clip Cost:{clips.price}</Box>
      ) : null}
      {print != null ? (
        <Box>Auxilaary Printing Cost:{print.price}</Box>
      ) : null}
      {hanger != null &&
      material != null &&
      hook != null &&
      clips != null &&
      print != null ? (
        <Box>
          Total:
          {(hanger.totalWeight * material.price) / 1000 +
            Number(clips.price) +
            Number(print.price) +
            Number(hook.price)}
          <br />
          <Typography
            variant="h4"
            backgroundColor="yellow"
            width="175px"
            color="green"
          >
            10% margin:{" "}
            {(
              ((hanger.totalWeight * material.price) / 1000 +
                Number(clips.price) +
                Number(print.price) +
                Number(hook.price)) *
              1.1
            ).toFixed(2)}
          </Typography>
          <Typography variant="h4" backgroundColor="orange" width="175px">
            15% margin:{" "}
            {(
              ((hanger.totalWeight * material.price) / 1000 +
                Number(clips.price) +
                Number(print.price) +
                Number(hook.price)) *
              1.15
            ).toFixed(2)}
          </Typography>
          <Typography
            variant="h4"
            backgroundColor="green"
            color="white"
            width="175px"
          >
            20% margin:{" "}
            {(
              ((hanger.totalWeight * material.price) / 1000 +
                Number(clips.price) +
                Number(print.price) +
                Number(hook.price)) *
              1.2
            ).toFixed(2)}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default QuoteBody;
