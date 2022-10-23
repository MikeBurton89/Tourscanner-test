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
    borderRadius: '3px',
    margin: `10px 5px`,
    height: '270px',
    width: `300px`,
    objectFit: 'cover',
    cursor: 'url(hand.cur), pointer',
}))


function AllImagesContainer({ arrayOfImages, allowModal }) {
    const [selectedImage, setSelectedImage] = useState({})
    const [open, setOpen] = useState(false);
    const [savedImages, setSavedImages] = useState([])


    const handleSave = (event, image) => {
        event.preventDefault()
        if (allowModal) {
            setSelectedImage(image)
            setOpen(true)
            setSavedImages([...savedImages, image.url])

        }
    }

    return (
        <ModalContext.Provider value={{ open, setOpen }} >
            <TabPanel>
                <Grid item xs={12}>
                    <Grid container>
                        {arrayOfImages && arrayOfImages.map((image) =>
                            <>
                                <Grid item xs={12} sm={8} md={6} lg={4} xl={3} justifyItems='flex-start'>
                                    <StyledImage
                                        component='img'
                                        loading='lazy'
                                        src={image.url}
                                        key={image.title}
                                        onClick={(event) => handleSave(event, image)} />
                                    <TitleBox color={savedImages.includes(image.url) ? 'blue' : 'black'} title={image.title} />
                                </Grid>
                            </>)}
                        {open === true && <SaveImageModal selectedImage={selectedImage} savedImages={savedImages} ></SaveImageModal>}
                    </Grid>
                </Grid>
            </TabPanel >
        </ ModalContext.Provider>
    )
}

export default AllImagesContainer