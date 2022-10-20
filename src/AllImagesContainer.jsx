import React, { useState } from 'react'
import { Box, Grid, } from '@mui/material'
import { TabPanel } from './TabSystem'
import TitleBox from './TitleBox'
import SaveImageModal from './SaveImageModal'
import { createContext, } from 'react';
import { styled } from '@mui/material/styles'

export const ModalContext = createContext()
const StyledImage = styled(Box)(() =>
({
    padding: 0,
    margin: `10px 5px`,
    height: '270px',
    width: `300px`,
    objectFit: 'cover',
    cursor: 'url(hand.cur), pointer',
}))


function AllImagesContainer({ arrayOfImages, allowModal }) {
    // const [error, setError] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState({})
    const [open, setOpen] = useState(false);

    const handleSave = (event, image) => {
        event.preventDefault()
        if (allowModal) {
            setSelectedImage(image)
            setOpen(true)

        }
    }

    return (
        <ModalContext.Provider value={{ open, setOpen }} >
            <TabPanel>
                <Grid item xs={12}>
                    <Grid container>
                        {arrayOfImages && arrayOfImages.map((image) => <>
                            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} justifyItems='flex-start'>
                                <StyledImage
                                    component='img'
                                    loading='lazy'
                                    src={image.url}
                                    key={image.image_id}
                                    onClick={(event) => handleSave(event, image)} />
                                <TitleBox color={selectedImage.image_id === image.image_id ? 'blue' : 'black'} title={image.title} />
                            </Grid>
                        </>)}
                        {open === true && <SaveImageModal selectedImage={selectedImage} ></SaveImageModal>}
                    </Grid>
                </Grid>
            </TabPanel >
        </ ModalContext.Provider>
    )
}

export default AllImagesContainer