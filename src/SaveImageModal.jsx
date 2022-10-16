import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { getNumberOfSaves } from './services/getNumberOfSaves'
import { postImageId } from './services/postImageId'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, handleClose, selectedImage }) {
    const folderRef = useRef('')
    const [numberOfSaves, setNumberOfSaves] = useState('')
    console.log(selectedImage)

    useEffect(() => {
        const fetchNumberOfSaves = getNumberOfSaves(selectedImage?.image_id)
        setNumberOfSaves(fetchNumberOfSaves)
        console.log(numberOfSaves)
    }, [selectedImage])

    const handleLocalSave = (event, image) => {
        event.preventDefault()
        postImageId(image.image_id)
        localStorage.setItem(folderRef.current.value, image)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField value={folderRef.current.value} ref={folderRef} placeholder={'Select a folder Name'}></TextField>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {numberOfSaves}
                    </Typography>
                    <Button onClick={(e) => handleLocalSave(e, selectedImage)}>Save</Button>
                </Box>
            </Modal>
        </div>
    );
}