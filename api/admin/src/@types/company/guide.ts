declare type GuideTranslationDto = {
    language_id: string;
    name: string;
    description?: string;
}
export declare type CreateGuideDto = {
    link?: string;
    slug: string;
    translations: GuideTranslationDto[];
}

export declare type CompanyGuideApiResponse = {
    id: string;
    link?: string;
    image_path: string | null;
    slug: string;
    translations: GuideTranslationDto[];
}