export declare type CreateAssociationDto = {
    image: File | string | null
    name: string;
    link: string;
}

export type CompanyAssociationsApiResponse = {
    id: string;
    name: string;
    link: string;
    image_path: string | null
}