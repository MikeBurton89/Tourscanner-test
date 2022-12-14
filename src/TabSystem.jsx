import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import AllImagesContainer from './AllImagesContainer';


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


export default function BasicTabs(props) {
    const [value, setValue] = useState(0);
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


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="saved images tab"
                    variant="scrollable"
                    scrollButtons="auto">
                    {Object.keys(window.localStorage).map((title, index) => <Tab key={title} label={title} value={index} />)}
                </Tabs>
            </Box>
            {
                Object.keys(window.localStorage).map((tab, index) =>
                    <TabPanel key={tab} sx={{ overflow: 'scroll' }} value={value} index={index} >
                        <AllImagesContainer allowModal={tab === 'All Images'} arrayOfImages={JSON.parse(localStorage.getItem(tab))} />
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
                {Object.keys(window.localStorage).map((title) => <ToggleButton key={title} value={title}>{title}</ToggleButton>)}
            </ToggleButtonGroup>}
        </Box >
    );
}