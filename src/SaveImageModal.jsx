import React, { useState, useRef, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ImageList, TextField } from '@mui/material';
import { getNumberOfSaves } from './services/getNumberOfSaves'
import { postImageId } from './services/postImageId'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ModalContext } from './AllImagesContainer';


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

export default function BasicModal({ selectedImage }) {
    const queryClient = useQueryClient()
    const [folderName, setFolderName] = useState('')
    const { open, setOpen } = useContext(ModalContext)
    const [imageArray, setImageArray] = useState([])

    console.log(selectedImage)

    // useEffect(() => {
    //     const fetchNumberOfSaves = getNumberOfSaves(selectedImage?.image_id)
    //     setNumberOfSaves(fetchNumberOfSaves)
    //     console.log(numberOfSaves)
    // }, [selectedImage])

    const { data, isFetching } = useQuery(['saves', selectedImage.image_id], () => getNumberOfSaves(selectedImage?.image_id))

    const { mutate, isFetching: isLoadingPost } = useMutation(postImageId, {
        onSuccess: data => {
            console.log(data);
            setOpen(false)
        },
        onError: () => {
            alert("there was an error")
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });

    const handleLocalSave = (event, image, folder) => {
        event.preventDefault()
        mutate(image.image_id)
        try {
            if (localStorage.getItem(folder) !== null) {
                const previousImages = JSON.parse(localStorage.getItem(folder))
                console.log(previousImages)
                const imageArray = [...previousImages, image]
                localStorage.setItem(folder, JSON.stringify(imageArray))
            }
            if (localStorage.getItem(folder) === null) {
                const imageArray = [image]
                localStorage.setItem(folder, JSON.stringify(imageArray))
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        value={folderName}
                        onChange={(e) => {
                            e.preventDefault()
                            setFolderName(e.target.value)
                        }}
                        error={folderName.length < 1}
                        placeholder={'Select a folder Name'}>
                    </TextField>
                    {isFetching ? 'Loading...' :
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {`This image has been saved ${data && data} times`}
                        </Typography>}
                    {isLoadingPost ? 'Saving' : <Button disabled={folderName.length < 1} onClick={(e) => handleLocalSave(e, selectedImage, folderName)}>Save</Button>}
                </Box>
            </Modal>
        </div>
    );
}