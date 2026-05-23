declare type AchievementTranslationDto = {
    language_id: string;
    title: string;
    description?: string;
}
export declare type CreateAchievementDto = {
    year: number;
    image: File | string | null
    translations: AchievementTranslationDto[];
}

export type CompanyAchivementsApiResponse = {
    id: string;
    year: number;
    image_path: string | null
    translations: AchievementTranslationDto[];
}

export type CompanyAchivementsTranslationForm = {
    year: number;
    translations: AchievementTranslationDto[];
}