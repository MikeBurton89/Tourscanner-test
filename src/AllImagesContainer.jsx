import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Grid, } from '@mui/material'
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
            <Grid item xs={12}>
                {images && images.map((image) => <>
                    <Box
                        component='img'
                        loading='lazy'
                        style={{ margin: '10px 5px' }}
                        src={image.url}
                        key={image.image_id}
                        height={'300px'}
                        width={'270px'}
                        sx={{ objectFit: 'cover', }}
                        onClick={() => getNumberOfSaves(image.image_id)} />
                </>)}
            </Grid>
        </TabPanel>
    )
}

export default AllImagesContainer