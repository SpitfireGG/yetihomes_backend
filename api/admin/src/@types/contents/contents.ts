import { MetaData } from "../common";

export type CreateContentCategory = {
    name: string
}

export type ContentCategoryApiResponse = {
    id: string;
    name: string
}

export enum ContentTypes {
    NEWS = "NEWS",
    BLOG = "BLOG"
}
export enum ContentStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}


declare type ContentTranslationDto = {
    language_id: string;
    title: string;
    description: string;
    body?: string;
}

export declare type CreateContentDto = {
    image: string | File | null
    type: ContentTypes;
    category_id: string;
    slug: string;
    highlight?: boolean;
    status: ContentStatus;
    translations: ContentTranslationDto[];
    meta: MetaData;
}

export declare type ContentApiResponse = {
    id: string
    image: string | File | null
    type: ContentTypes;
    category_id: string;
    slug: string;
    highlight: boolean;
    status: ContentStatus;
    translations: ContentTranslationDto[];
    meta: MetaData;
}

export interface Category {
    id: string;
    name: string;
}

export interface Translation {
    id: string;
    content_id: string;
    language_id: string;
    title: string;
    description: string;
    body: string; // HTML string
}


export type ContentByIdApiResponse = {
    id: string;
    type: ContentTypes;
    category_id: string;
    slug: string;
    cover_image: string;
    highlight: boolean;
    status: ContentStatus;
    translations: Translation[];
    category: Category;
    meta: MetaData[];
}

export type ContentTranslationFormData = {
    slug: string;
    type: ContentTypes;
    status: ContentStatus;
    category_id: string;
    highlight: boolean;
    translations: ContentTranslationDto[];
} 