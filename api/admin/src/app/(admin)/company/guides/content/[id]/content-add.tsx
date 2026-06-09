'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { NumberInput, TextAreaInput, TextInput } from '@/components/common/Inputs'
import TinymceEditor from '@/components/common/TinymceEditor'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import {
    useCompanyGetGuidesById,
    useLanguages,
} from '@/hooks/useTankstack-query'
import { CRUD } from '@/api/crud'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import TableSkeleton from '@/components/common/table-skeleton'
import { CompanyTeamTranslationDataForm } from '@/@types/company/team'



type Props = {
    tripId: string;
    destinationId: string;
}

const AddContentForm = ({ destinationId, tripId }: Props) => {
    const destinationCrud = new CRUD(`api/company/guides`)
    const { data } = useCompanyGetGuidesById(destinationId)
    const destination = data?.data as any
    const router = useRouter()
    const { data: lang, isLoading } = useLanguages()
    const languages = lang?.data ?? []

    const [formData, setFormData] = useState<any>({
        slug: '',
        translations: [],
    })

    /* --------------------------------------------
       Find English language
    --------------------------------------------- */
    const englishLanguage = useMemo(
        () => languages.find(l => l.code === 'en'),
        [languages]
    )

    /* --------------------------------------------
       Load destination data
    --------------------------------------------- */
    useEffect(() => {
        if (!destination) return

        setFormData({
            slug: destination.slug,
            translations: destination.translations ?? [],
        })
    }, [destination])

    /* --------------------------------------------
       Helpers
    --------------------------------------------- */
    const updateTranslation = (
        index: number,
        field: 'language_id' | 'name' | 'description',
        value: string
    ) => {
        setFormData(prev => {
            const updated = [...prev.translations]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, translations: updated }
        })
    }

    const deleteTranslation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            translations: prev.translations.filter((_, i) => i !== index),
        }))
    }

    /* --------------------------------------------
       Per-row available languages (NO DUPLICATES)
    --------------------------------------------- */
    const getAvailableLanguages = (currentLanguageId?: string) => {
        return languages.filter(l =>
            l.code !== 'en' &&
            (
                l.id === currentLanguageId ||
                !formData.translations.some(
                    t => t.language_id === l.id
                )
            )
        )
    }

    /* --------------------------------------------
       Add translation (only if languages remain)
    --------------------------------------------- */
    const addTranslation = () => {
        const remainingLanguages = languages.filter(
            l =>
                l.code !== 'en' &&
                !formData.translations.some(
                    t => t.language_id === l.id
                )
        )

        if (!remainingLanguages.length) return

        setFormData(prev => ({
            ...prev,
            translations: [
                ...prev.translations,
                {
                    language_id: '',
                    name: '',
                    role: '',
                    description: '',
                },
            ],
        }))
    }

    /* --------------------------------------------
       Submit
    --------------------------------------------- */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await destinationCrud.updateWithOutImage(formData, destinationId)
            toast.success(res.message);
            router.push("/company/guides")
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        }
    }

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="p-2 md:p-0">
            <h1 className="text-2xl font-bold tracking-tight mt-4">
                Edit Destination Content
            </h1>

            <form onSubmit={handleSubmit} className="py-4 space-y-6">

                {/* TRANSLATIONS */}
                {formData.translations.map((translation, index) => {
                    const isEnglish =
                        translation.language_id === englishLanguage?.id

                    const availableLanguages =
                        getAvailableLanguages(translation.language_id)

                    return (
                        <div
                            key={index}
                            className="border p-4 rounded space-y-4"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">
                                    {isEnglish ? 'English' : 'Translation'}
                                </h3>

                                {!isEnglish && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteTranslation(index)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>

                            {/* Title */}
                            <TextInput
                                label="Title"
                                value={translation.name}
                                onChange={e =>
                                    updateTranslation(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                            />

                            {/* Language */}
                            <Label>Language</Label>
                            <Select
                                value={translation.language_id}
                                onValueChange={value =>
                                    updateTranslation(
                                        index,
                                        'language_id',
                                        value
                                    )
                                }
                                disabled={isEnglish}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>

                                <SelectContent>
                                    {isEnglish ? (
                                        <SelectItem value={englishLanguage!.id}>
                                            English
                                        </SelectItem>
                                    ) : (
                                        availableLanguages.map(lang => (
                                            <SelectItem
                                                key={lang.id}
                                                value={lang.id}
                                                disabled={formData.translations.some(
                                                    (t, i) =>
                                                        t.language_id === lang.id &&
                                                        i !== index
                                                )}
                                            >
                                                {lang.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>

                            {/* Content */}
                            <TextAreaInput value={translation.description} onChange={(e) => updateTranslation(index, 'description', e.target.value)} label='Description' name='description' />
                        </div>
                    )
                })}

                {/* ADD TRANSLATION */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={addTranslation}
                    disabled={
                        languages.filter(
                            l =>
                                l.code !== 'en' &&
                                !formData.translations.some(
                                    t => t.language_id === l.id
                                )
                        ).length === 0
                    }
                >
                    + Add Translation
                </Button>

                {/* SUBMIT */}
                <div className="text-right">
                    <Button type="submit">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddContentForm
