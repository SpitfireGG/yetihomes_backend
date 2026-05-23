"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NumberInput, TextAreaInput, TextInput } from '@/components/common/Inputs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import TinymceEditor from '@/components/common/TinymceEditor'
import { useActivities, useCurrencies, useDestinations, useLanguages, useTripDifficulties } from '@/hooks/useTankstack-query'
import { CRUD } from '@/api/crud'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { PreviewImage } from '@/components/common/image'
import { convertTitleIntoSlug } from '@/utils/common'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CreateAboutDto } from '@/@types/company/about-us'

const page = () => {
    const trips = new CRUD('api/company/terms-and-conditions')
    const { data: languages } = useLanguages()
    const route = useRouter()
    const [formData, setFormData] = useState<CreateAboutDto>({
        translations: [
            {
                language_id: "",
                title: "",
                content: ''
            }
        ],
        meta: {
            meta_title: '',
            meta_description: '',
            canonical_url: '',
            keywords: '',
            robots: '',
            schema_markup: null,
            social_image: ''
        }
    })


    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await trips.createWithOutImage(formData);
            toast.success(result.message)
            route.push('/terms')
        } catch (error: any) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        setFormData(prev => ({
            ...prev,
            translations: [
                {
                    ...prev.translations[0],
                    title,
                },
            ],
        }))
    }

    const handleContentChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            translations: [
                {
                    ...prev.translations[0],
                    content,
                },
            ],
        }))
    }

    const handleMetaData = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === "schema_markup") {
            if (value.trim()) {
                try {
                    JSON.parse(value); // validate only
                } catch {
                    // show validation error if you want
                    return;
                }
            }
        }

        setFormData((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                [name]: value.trim() ? value : null,
            },
        }));
    };




    const safeJsonParse = (value: string) => {
        try {
            return value ? JSON.parse(value) : {}
        } catch {
            return {}
        }
    }

    const handleLanguageChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            translations: [
                {
                    ...prev.translations[0],
                    language_id: value,
                },
            ],
        }))
    }

    return (
        <>
            <h1 className="text-2xl font-bold tracking-tight mt-4">Create Terms and conditions</h1>
            <form onSubmit={handelSubmit} className='py-4'>
                <Tabs defaultValue="trip-details" className="">
                    <TabsList>
                        <TabsTrigger value="trip-details">Details</TabsTrigger>
                        <TabsTrigger value="trip-metadata">Metadata</TabsTrigger>
                    </TabsList>
                    <TabsContent value="trip-details">
                        <div className='py-4 grid md:grid-cols-2 gap-6 w-full'>
                            <div className='col-span-2 grid md:grid-cols-2 gap-4'>
                                <TextInput label='Title' placeholder='Enter Title' name='title' value={formData.translations[0].title} onChange={handleTitleChange} />
                            </div>
                            <div className='col-span-2 grid grid-cols-2  md:grid-cols-5 gap-4'>
                                <div className='space-y-3'>
                                    <Label>Language</Label>
                                    <Select value={formData.translations[0]?.language_id} onValueChange={handleLanguageChange} required>
                                        <SelectTrigger className="w-45">
                                            <div className="flex items-center gap-2">
                                                <SelectValue placeholder='Select Language' />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages?.data && languages.data.map((lang) => (
                                                <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='col-span-2 space-y-3'>
                                <Label>Content</Label>
                                <TinymceEditor value={formData.translations[0]?.content} onChange={handleContentChange} />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="trip-metadata">
                        <div className='py-4 grid md:grid-cols-2 gap-6 w-full'>
                            <TextInput label='Meta Title' placeholder='Enter meta title' name='meta_title' value={formData.meta.meta_title} onChange={handleMetaData} />
                            <TextInput label='Meta Description' placeholder='Enter meta description' name='meta_description' value={formData.meta.meta_description} onChange={handleMetaData} />
                            <TextInput label='Canonical Url' placeholder='Enter Urls' type='url' name='canonical_url' value={formData.meta.canonical_url} onChange={handleMetaData} />
                            <TextInput label='Keywords' placeholder='Enter Keywords' name='keywords' value={formData.meta.keywords} onChange={handleMetaData} />
                            <TextInput label='Robots Tags' placeholder='Enter rebots' name='robots' value={formData.meta.robots} onChange={handleMetaData} />
                            <TextInput label='Social Image' placeholder='' name='social_image' value={formData.meta.social_image} onChange={handleMetaData} />
                            <TextAreaInput label='Schema Markup' placeholder='Enter Schema {}' name='schema_markup' onChange={handleMetaData} />
                        </div>
                    </TabsContent>
                </Tabs>
                <div className=' text-right'>
                    <Button type="submit" className='text-right min-w-2xs'>Create</Button>
                </div>
            </form>
        </>
    )
}

export default page
