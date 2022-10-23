import React from 'react'
import { Typography, IconButton, Stack, } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const truncate = (string) => {
    return string.length > 30 ? string.substring(0, 90) + "..." : string
}

function TitleBox(props) {
    return (
        <Stack sx={{ width: '300px' }} direction='row' justifyContent='space-between' alignItems='center'>
            <IconButton><ArrowDropDownIcon /></IconButton>
            <Typography color={props.color} variant='caption'>{truncate(props.title)}</Typography>
        </Stack>
    )
}

export default TitleBox