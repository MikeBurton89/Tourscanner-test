import React, { useState } from 'react'
import { useEffect } from 'react'
import { ImageList, ImageListItem, Box, Grid, ImageListItemBar } from '@mui/material'
import { TabPanel } from './TabSystem'
import { getNumberOfSaves } from './services/getNumberOfSaves'



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
        }).then(data => setImages(data))
            .catch(error => setError(true))
            .finally(() => setIsLoading(false))
        return () => {
        }
    }, [])

    if (isLoading) return 'Loading...'
    if (error) return 'Error'

    return (
        <TabPanel>
            <Grid item xs={6} md={8} lg={12}>
                <ImageList cols={12} sx={{ margin: 'auto' }}>
                    {images && images.map((image) => <>
                        <ImageListItem onClick={() => getNumberOfSaves(image.image_id)} cols={2} sx={{ marginX: '10px', marginY: '20px' }}>
                            <img loading='lazy'
                                src={image.url}
                                key={image.image_id}
                                height={'300px'}
                                width={'270px'}
                                style={{ objectFit: 'cover', }} />
                            <ImageListItemBar title={image.title} position='below' />
                        </ImageListItem>
                    </>)}
                </ImageList>
            </Grid>
        </TabPanel>
    )
}

export default AllImagesContainer