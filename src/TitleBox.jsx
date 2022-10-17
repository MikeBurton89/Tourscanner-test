import React from 'react'
import { Box, Grid, Typography, IconButton, Stack, } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const truncate = (string) => {
    return string.length > 30 ? string.substring(0, 90) + "..." : string
}

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
                <Typography color={props.color} variant='caption'>{truncate(props.title)}</Typography>
            </div>
        </Stack>
    )
}

export default TitleBox