import React from 'react'
import EditCsi from './csi-edit-form'

type Props = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
    const { id } = await params;
    return (
        <EditCsi id={id} />
    )
}

export default page