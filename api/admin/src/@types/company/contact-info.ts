type TeamTranslationDto = {
    language_id: string;
    name: string;
    role?: string;
    description?: string;
}

export type ConpanyTeamDataForm = {
    slug: string;
    image: File | null | string
    translations: TeamTranslationDto[];
}

type GuideTranslationDto = {
    language_id: string;
    name: string;
    description?: string;
}
export type CreateGuideDataForm = {
    image: File | string | null;
    link?: string;
    slug: string;
    translations: GuideTranslationDto[];
}

type CSITranslationDto = {
    language_id: string;
    title: string;
    description: string;
    content?: string;
}
export type CreateCSIDataForm = {
    slug: string;
    translations: CSITranslationDto[];
}
export type CreateContactInfoFormData = {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    map: string;
}

export enum SocialPlatform {
    FACEBOOK = "FACEBOOK",
    INSTAGRAM = "INSTAGRAM",
    TWITTER = "TWITTER",
    LINKEDIN = "LINKEDIN",
    YOUTUBE = "YOUTUBE",
    PINTEREST = "PINTEREST",
    TIKTOK = "TIKTOK",
    TRIPADVISOR = "TRIPADVISOR",
    GOOGLE_BUSINESS = "GOOGLE_BUSINESS",
    WHATSAPP = "WHATSAPP",
    TELEGRAM = "TELEGRAM",
    WEBSITE = "WEBSITE"
}
export type CreateSocialMediaFormData = {
    platform: SocialPlatform;
    url: string;
}

export type SocialPlatformApiResponse = {
    id: string
    platform: SocialPlatform;
    url: string;
}

export type ContactInfoApiResponse = {
    id: string;
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    map: string;
    createdAt: Date,
    updatedAt: Date
}