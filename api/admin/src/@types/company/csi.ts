declare type CSITranslationDto = {
    language_id: string;
    title: string;
    description: string;
    content?: string;
}
export declare type CreateCSIDto = {
    slug: string;
    image: File | string | null;
    translations: CSITranslationDto[];
}

export declare type CompanyCSIApiResponse = {
    id: string
    slug: string;
    image_path: string | null;
    translations: CSITranslationDto[];
}

export declare type CompanyCSITranslationFormData = {
    slug: string;
    translations: CSITranslationDto[];
}