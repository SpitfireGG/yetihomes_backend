import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='flex gap-x-4 h-20 items-center'>
                <div className="relative h-16 w-28">
                    <Image 
                        src="/Yeti-Logo-02.svg" 
                        alt="Yeti Homes"
                        fill
                        className="object-contain"
                    />
                </div>
                <Separator orientation='vertical' className='h-12' />
                <div className='flex flex-col h-full justify-center'>
                    <span className='text-3xl text-primary font-semibold'>404</span>
                    <span className='text-sm'>Page Not Found</span>
                </div>
            </div>
        </div>
    )
}

export default NotFound;