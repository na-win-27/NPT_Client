import React from 'react'
import {Box} from '@mui/material'
import { ProgressBar } from "react-loader-spinner";

const Loading = () => {
  return (
    <Box  style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}>
        <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor = '#FE6E0C'
      barColor = '#0F3137'
    />
        </Box>
  )
}

export default Loading