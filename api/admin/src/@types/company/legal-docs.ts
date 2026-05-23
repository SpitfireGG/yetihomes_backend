export type CompanyLegalDocumentsImages = {
    id: string;
    title: string;
    image_path: string;
}

export declare type CreateCompanyLegalDocuments = {
    title: string;
    image: File | string | null;
}