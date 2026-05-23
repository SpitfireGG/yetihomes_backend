import { API_URL } from '@/utils/main'
import React from 'react'

const DisplayImage = ({ url }: { url: string }) => {
    return (<img
        src={`${API_URL}/uploads/${url}`}
        alt="Preview"
        className="mt-2 h-24 rounded"
    />)
}

export const PreviewImage = ({ url }: { url: string | null | File }) => {
    const imageSrc =
        url instanceof File
            ? URL.createObjectURL(url)
            : url ? `${API_URL}/uploads/${url}` : "/placeholder.png";
    return (

        <img src={imageSrc} className='mt-3 h-24 rounded' />

    )
}

export default DisplayImage;