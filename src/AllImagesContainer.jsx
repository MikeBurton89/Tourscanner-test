import React, { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Typography, IconButton, Stack, } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TabPanel } from './TabSystem'
import TitleBox from './TitleBox'
import { getNumberOfSaves } from './services/getNumberOfSaves'
import SaveImageModal from './SaveImageModal'
import { createContext, } from 'react';

import { styled } from '@mui/material/styles'
import { handleBreakpoints } from '@mui/system';

export const ModalContext = createContext()
const StyledImage = styled(Box)(() =>
({
    padding: 0,
    margin: `10px 5px`,
    height: '270px',
    width: `300px`,
    objectFit: 'cover'
}))


function AllImagesContainer({ arrayOfImages, title }) {
    // const [error, setError] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState({})
    const [open, setOpen] = useState(false);

    const handleSave = (event, image) => {
        event.preventDefault()
        setSelectedImage(image)
        setOpen(true)
    }

    return (
        <ModalContext.Provider value={{ open, setOpen }} >
            <TabPanel>
                <Grid item xs={12}>
                    <Grid container>
                        {arrayOfImages && arrayOfImages.map((image) => <>
                            <Grid item xs={10} sm={8} md={6} lg={4} xl={3} justifyItems='flex-start'>
                                <StyledImage
                                    component='img'
                                    loading='lazy'
                                    src={image.url}
                                    key={image.image_id}
                                    onClick={(event) => handleSave(event, image)} />
                                <TitleBox color={selectedImage.image_id === image.image_id ? 'blue' : 'black'} title={image.title} />
                            </Grid>
                        </>)}
                    </Grid>
                    <SaveImageModal title={title} selectedImage={selectedImage} ></SaveImageModal>
                </Grid>
            </TabPanel >
        </ ModalContext.Provider>
    )
}

export default AllImagesContainer