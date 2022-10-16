import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Grid, Typography, IconButton, Stack, } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TabPanel } from './TabSystem'
import TitleBox from './TitleBox'
import { getNumberOfSaves } from './services/getNumberOfSaves'
import SaveImageModal from './SaveImageModal'

import { styled } from '@mui/material/styles'
import { handleBreakpoints } from '@mui/system';

const StyledImage = styled(Box)(() =>
({
    padding: 0,
    margin: `10px 5px`,
    height: '270px',
    width: `300px`,
    objectFit: 'cover'
}))

function AllImagesContainer() {
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (event, image) => {
        event.preventDefault()
        setSelectedImage(image)
        setOpen(true)
    }

    useEffect(() => {

        fetch('https://tourscanner.com/interview/images').then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        }).then(data => {
            setImages(data)

        })
            .catch(error => setError(true))
            .finally(() => setIsLoading(false))
        return () => {
        }
    }, [])


    if (isLoading) return 'Loading...'
    if (error) return 'Error'

    return (
        <TabPanel>
            <Grid item xs={12}>
                <Grid container>
                    {images && images.map((image) => <>
                        <Grid item xs={10} sm={6} md={6} lg={4} xl={2} justifyItems='flex-start'>
                            <StyledImage
                                component='img'
                                loading='lazy'
                                src={image.url}
                                key={image.image_id}
                                onClick={(event) => handleSave(event, image)} />
                            <TitleBox title={image.title} />
                        </Grid>

                    </>)}
                </Grid>
                <SaveImageModal selectedImage={selectedImage} open={open} handleClose={handleClose} ></SaveImageModal>
            </Grid>
        </TabPanel >
    )
}

export default AllImagesContainer