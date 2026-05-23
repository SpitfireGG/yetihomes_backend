import { MetaData } from "../common";

type AboutTranslationDto = {
    language_id: string;
    title: string;
    content?: string;
}
export declare type CreateAboutDto = {

    translations: AboutTranslationDto[];
    meta: MetaData;
}

export type AboutUsApiReponse = {
    data: {
        id: string;
        meta_id: string;
        meta: MetaData;
        translations: {
            id: string;
            about_id: string;
            language_id: string;
            title: string;
            content: string;
        }[];
    },
    message: string,
    statusCode: number
}

export type AboutTranslationFormData = {
    translations: AboutTranslationDto[];
}