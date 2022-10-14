import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from '@mui/material'
import ImageContainer from "./ImageContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImageContainer></ImageContainer>
      </header>
    </div >

  );
}

export default App;
