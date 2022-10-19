import React, { useEffect, useState } from "react";
import ImagesContainer from "./AllImagesContainer"
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from "@mui/material";
import BasicTabs from "./TabSystem";
import { useQuery } from '@tanstack/react-query'
import { getImages } from "./services/getImages";


function App() {
  const [initialState, setInitialState] = useState([])
  const { data, isFetching, isFetched, refetch } = useQuery(['images'], () => getImages(), { enabled: true, staleTime: Infinity })
  console.log(data)


  useEffect(() => {
    if (isFetched && data) {
      setInitialState([data])
      localStorage.setItem('All Images', JSON.stringify(data))
    }
  }, [initialState, setInitialState])

  return (
    <Grid container direction="row"
      justifyContent="center"
      alignItems="center" sx={{ width: '100%' }}>
      {isFetched && <BasicTabs />}
      {isFetching && 'Loading...'}
      <CssBaseline />
    </Grid>
  );
}

export default App;
