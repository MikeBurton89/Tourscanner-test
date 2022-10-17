import React, { useEffect, useState } from "react";
import ImagesContainer from "./AllImagesContainer"
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from "@mui/material";
import BasicTabs from "./TabSystem";
import { useQuery } from '@tanstack/react-query'
import { getImages } from "./services/getImages";




function App() {
  const [initialState, setInitialState] = useState()
  const { data, isLoading, isFetching, refetch } = useQuery(['images'], () => getImages())
  console.log(data)

  useEffect(() => {
    if (localStorage.getItem('All Images') === null) { refetch() }
  }, [])

  useEffect(() => {
    if (data) {
      setInitialState(JSON.stringify(data))
      localStorage.setItem('All Images', JSON.stringify(data))
    }
  }, [data, isLoading])

  return (
    <Grid container direction="row"
      justifyContent="center"
      alignItems="center" sx={{ width: '100%' }}>
      <BasicTabs />
      <CssBaseline />
    </Grid>
  );
}

export default App;
