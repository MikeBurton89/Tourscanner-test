import React, { useEffect, useState } from "react";
import ImagesContainer from "./AllImagesContainer"
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from "@mui/material";
import BasicTabs from "./TabSystem";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container direction="row"
        justifyContent="center"
        alignItems="center" sx={{ width: '100%' }}>
        <BasicTabs />
        <CssBaseline />
      </Grid>
    </QueryClientProvider>
  );
}

export default App;
