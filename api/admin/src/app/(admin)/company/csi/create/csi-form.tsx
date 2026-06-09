"use client"
import React, { useState } from 'react'
import { NumberInput, TextAreaInput, TextInput } from '@/components/common/Inputs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'

import TinymceEditor from '@/components/common/TinymceEditor'
import { useLanguages } from '@/hooks/useTankstack-query'
import { CRUD } from '@/api/crud'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PreviewImage } from '@/components/common/image'
import { CreateCSIDto } from '@/@types/company/csi'
import { convertTitleIntoSlug } from '@/utils/common'
import { useDefaultLanguage } from '@/components/common/language'

const AchivementCreate = () => {
    const trips = new CRUD(`api/company/csis`)
    const englishLanguage = useDefaultLanguage()
    const route = useRouter()
    const [formData, setFormData] = useState<CreateCSIDto>({
        image: null,
        slug: '',
        translations: [
            {
                language_id: "",
                title: "",
                description: '',
                content: '',
            }
        ],
    })



    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await trips.create(formData);
            toast.success(result.message)
            route.push(`/company/csi`)
        } catch (error: any) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        setFormData(prev => ({
            ...prev,
            slug: convertTitleIntoSlug(title),
            translations: [
                {
                    ...prev.translations[0],
                    title,
                },
            ],
        }))
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            slug: e.target.value,
        }));
    };
    const onChangeHandle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            translations: prev.translations.map((t, index) =>
                index === 0 ? { ...t, [name]: value } : t
            ),
        }));
    };

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

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (target instanceof HTMLInputElement && target.type === "file") {
            const file = target.files?.[0] ?? null;

            setFormData((prev) => ({
                ...prev,
                image: file
            }));
            return;
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
            <h1 className="text-2xl font-bold tracking-tight mt-4">Create CSI</h1>
            <form onSubmit={handelSubmit} className='py-4'>

                <div className='py-4 grid grid-cols-2 gap-6 w-full'>
                    <div className='col-span-2 grid md:grid-cols-2 gap-4'>
                        <TextInput label='Title' placeholder='Enter Title' name='title' value={formData.translations[0].title} onChange={handleTitleChange} />
                        <TextInput label='Slug' placeholder='Enter Slug' name='slug' value={formData.slug} onChange={handleSlugChange} />
                    </div>
                    <div className='col-span-2 grid md:grid-cols-2 gap-4'>
                        <TextAreaInput
                            label="Description"
                            name="description"
                            value={formData.translations[0].description}
                            onChange={onChangeHandle}
                        />
                        <div className="space-y-3">
                            <Label className=' capitalize' htmlFor="tabs-demo-name">Language<span className='text-red-600'>*</span></Label>
                            <Select value={formData.translations[0].language_id} disabled>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="English" />
                                </SelectTrigger>
                                <SelectContent>
                                    {englishLanguage && (
                                        <SelectItem value={englishLanguage.id}>{englishLanguage.name}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label>Image</Label>
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImage}
                        />

                        {formData.image && <PreviewImage url={formData.image} />}
                    </div>
                    <div className='col-span-2 space-y-3'>
                        <Label>Content</Label>
                        <TinymceEditor value={formData.translations[0]?.content} onChange={handleContentChange} />
                    </div>
                </div>
                <div className=' text-right'>
                    <Button type="submit" className='text-right min-w-2xs'>Create</Button>
                </div>
            </form>
        </>
    )
}

export default AchivementCreate;
