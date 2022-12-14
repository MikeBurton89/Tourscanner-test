import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline'
import { Grid } from "@mui/material";
import BasicTabs from "./TabSystem";
import { useQuery } from '@tanstack/react-query'
import { getImages } from "./services/getImages";


function App() {
  const [initialState, setInitialState] = useState([])
  const { data, isFetching, isFetched, refetch } = useQuery(['images'], () => getImages(), { enabled: true })
  console.log(data)

  useEffect(() => {
    if (isFetched && data) {
      window.localStorage.setItem('All Images', JSON.stringify(data))
      setInitialState([data])
    }
  }, [data])

  useEffect(() => {
    if (window.localStorage.getItem('All Images') === null) {
      refetch()
    }
  }, [])

  return (
    <Grid container direction="row"
      justifyContent="center"
      alignItems="center" sx={{ width: '100%' }}>
      {isFetched && <BasicTabs initialState={initialState} />}
      {isFetching && 'Loading...'}
      <CssBaseline />
    </Grid>
  );
}

export default App;
