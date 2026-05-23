import React from 'react'
import AboutEditForm from './abou-edit-form'

type Props = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
    const { id } = await params
    return (
        <AboutEditForm termsId={id} />
    )
}

export default page