import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Grid, Typography, IconButton, Stack, Tooltip } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TabPanel } from './TabSystem'
import { getNumberOfSaves } from './services/getNumberOfSaves'

import { styled } from '@mui/material/styles'

const StyledImage = styled(Box)(() =>
({
    margin: `10px 5px`,
    height: '300px',
    width: `270px`,
    objectFit: 'cover'
}))

function AllImagesContainer() {
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} justifyItems='flex-start'>
                            <StyledImage
                                component='img'
                                loading='lazy'
                                src={image.url}
                                key={image.image_id}
                                onClick={() => getNumberOfSaves(image.image_id)} />
                            <Stack direction='row' justifyContent='space-between'>
                                <IconButton><ArrowDropDownIcon /></IconButton>
                                <Typography sx={{ width: '60%', margin: '10px 5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellpisis' }} variant='caption'>{image.title}</Typography>
                            </Stack>
                        </Grid>
                    </>)}
                </Grid>
            </Grid>
        </TabPanel >
    )
}

export default AllImagesContainer