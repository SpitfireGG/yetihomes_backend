"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NumberInput, TextAreaInput, TextInput } from '@/components/common/Inputs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'

import TinymceEditor from '@/components/common/TinymceEditor'
import { useActivities, useCurrencies, useDestinations, useGetCompanyAboutUsData, useGetCompanyPrivacy, useLanguages, useTripDifficulties } from '@/hooks/useTankstack-query'
import { CRUD } from '@/api/crud'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { PreviewImage } from '@/components/common/image'
import { convertTitleIntoSlug } from '@/utils/common'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CreateAboutDto } from '@/@types/company/about-us'
import { Spinner } from '@/components/ui/spiner'
import { useDefaultLanguage } from '@/components/common/language'

const page = () => {
    const trips = new CRUD('api/company/privacy-policy')
    const { data, isLoading } = useGetCompanyPrivacy();
    const { data: languages } = useLanguages();
    const englishLanguage = useDefaultLanguage()
    const aboutUsData = data?.data;

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
            schema_markup: '',
            social_image: ''
        }
    })


    useEffect(() => {
        if (!aboutUsData) return;

        setFormData({
            translations: aboutUsData.translations?.length
                ? aboutUsData.translations.filter(t => t.language_id === englishLanguage?.id).map((t: any) => ({
                    language_id: t.language_id,
                    title: t.title ?? "",
                    content: t.content ?? "",
                }))
                : [
                    {
                        language_id: '',
                        title: '',
                        content: '',
                    },
                ],
            meta: {
                meta_title: aboutUsData.meta.meta_title,
                meta_description: aboutUsData.meta.meta_description,
                canonical_url: aboutUsData.meta.canonical_url ?? "",
                keywords: aboutUsData.meta.keywords,
                robots: aboutUsData.meta.robots,
                schema_markup: aboutUsData.meta.schema_markup ?? '',
                social_image: aboutUsData.meta.social_image,
            },
        });
    }, [aboutUsData]);

    // if (isLoading) return <Spinner />;
    if (!aboutUsData) return null;

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await trips.updateWithOutImage(formData, aboutUsData.id);
            toast.success(result.message)
            route.push('/privacy')
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

    const handleMetaData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const { name } = target;

        if (name === 'schema_markup') {
            setFormData((prev) => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    schema_markup: safeJsonParse(target.value),
                },
            }));
        }

        setFormData((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                [name]: target.value,
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


    return (
        <>
            <h1 className="text-2xl font-bold tracking-tight mt-4">Update Privacy Policy</h1>
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
                                    <Select value={formData.translations[0].language_id} disabled>
                                        <SelectTrigger className="w-45">
                                            <div className="flex items-center gap-2">
                                                <SelectValue placeholder='Select Language' />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {englishLanguage && ((
                                                <SelectItem key={englishLanguage.id} value={englishLanguage.id}>{englishLanguage.name}</SelectItem>
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
                            <TextAreaInput label='Schema Markup' placeholder='Enter Schema {}' name='schema_markup' value={formData.meta.schema_markup ?? ''} onChange={handleMetaData} />
                        </div>
                    </TabsContent>
                </Tabs>
                <div className=' text-right'>
                    <Button type="submit" className='text-right min-w-2xs'>Update</Button>
                </div>
            </form>
        </>
    )
}

export default page
