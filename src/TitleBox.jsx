import React from 'react'
import { Box, Grid, Typography, IconButton, Stack, } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



function TitleBox(props) {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <IconButton><ArrowDropDownIcon /></IconButton>
            <div style={{
                display: `webkit-box`,
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipisis',
                margin: '10px 5px',
            }}>
                <Typography color={props.color} variant='caption'>{props.title}</Typography>
            </div>
        </Stack>
    )
}

export default TitleBox