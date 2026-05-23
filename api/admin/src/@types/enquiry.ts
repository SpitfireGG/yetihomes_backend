export type EnquiryResponseApi = {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    referrer: string;
    resolved: boolean;
    createdAt: Date
}