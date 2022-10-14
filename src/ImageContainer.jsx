import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

function ImageContainer() {
    const { data, isLoading, error } = useQuery('images', () => fetch('https://tourscanner.com/interview/images').then(response => response.json))
    return (
        <>
            {data && data.map(() => <p>{data.image_id}</p>)}
        </>
    )
}

export default ImageContainer