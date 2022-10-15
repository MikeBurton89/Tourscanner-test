import React, { useEffect, useState } from "react";
import ImagesContainer from "./AllImagesContainer"
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from "@mui/material";
import BasicTabs from "./TabSystem";


function App() {
  return (
    <Grid container direction="row"
      justifyContent="center"
      alignItems="center" sx={{ width: '75%' }}>
      <BasicTabs />
      <CssBaseline />
    </Grid>
  );
}

export default App;
