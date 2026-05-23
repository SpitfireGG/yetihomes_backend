declare type AffiliationTranslationDto = {
    language_id: string;
    title: string;
    description?: string;
}

export declare type CreateAffiliationDto = {
    link: string;
    image: File | null | string;
    translations: AffiliationTranslationDto[];
}

export declare type CompanyAffiliationApiResponse = {
    id: string;
    link: string;
    image_path: null | string;
    translations: AffiliationTranslationDto[];
}


export type CompanyAffiliationTranslationDataForm = {
    link: string;
    translations: AffiliationTranslationDto[]
}