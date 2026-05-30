"use client"
import React, { useState } from 'react'
import { TextInput } from '@/components/common/Inputs'
import { Label } from '@/components/ui/label'
import TinymceEditor from '@/components/common/TinymceEditor'
import { CRUD } from '@/api/crud'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const page = () => {
    const trips = new CRUD('api/company/cookie-policy')
    const route = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await trips.createWithOutImage({ title, content });
            toast.success(result.message)
            route.push('/cookies')
        } catch (error: any) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold tracking-tight mt-4">Create Cookies Policy</h1>
            <form onSubmit={handelSubmit} className='py-4'>
                <div className='py-4 grid md:grid-cols-2 gap-6 w-full'>
                    <div className='col-span-2 grid md:grid-cols-2 gap-4'>
                        <TextInput label='Title' placeholder='Enter Title' name='title' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='col-span-2 space-y-3'>
                        <Label>Content</Label>
                        <TinymceEditor value={content} onChange={setContent} />
                    </div>
                </div>
                <div className='text-right'>
                    <Button type="submit" className='text-right min-w-2xs'>Create</Button>
                </div>
            </form>
        </>
    )
}

export default page
