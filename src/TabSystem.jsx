import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import AllImagesContainer from './AllImagesContainer';
import { useQuery } from '@tanstack/react-query';

import { getImages } from './services/getImages'

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function BasicTabs() {
    const [bottomTabs, setBottomTabs] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 15) {
            setBottomTabs(true);
        } else {
            setBottomTabs(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
    }, [])

    const { data, isLoading, isFetching, refetch } = useQuery(['images'], () => getImages())
    console.log(data)

    useEffect(() => {
        if (localStorage.getItem('All Images') === null) { refetch() }
    }, [])

    useEffect(() => {
        if (data) {
            localStorage.setItem('All Images', JSON.stringify(data))
        }
    }, [data, isLoading])

    const [value, setValue] = React.useState('All Images');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {Object.keys(localStorage).map((title) => <Tab label={title} value={title} />)}
                </Tabs>
            </Box>
            {
                Object.keys(localStorage).map((tab) =>
                    <TabPanel sx={{ overflow: 'scroll' }} value={value} index={tab} >
                        <AllImagesContainer arrayOfImages={JSON.parse(localStorage.getItem(tab))} />
                    </TabPanel>)
            }
            {bottomTabs && <ToggleButtonGroup
                sx={{ position: 'sticky', bottom: 0, background: '#ddd' }}
                color="primary"
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                {Object.keys(localStorage).map((title) => <ToggleButton value={title}>{title}</ToggleButton>)}
            </ToggleButtonGroup>}
        </Box >
    );
}