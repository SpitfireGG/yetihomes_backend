export type TripReviewFormData = {
    image: File | null | string
    rating: number;
    reviewer: string;
    title: string;
    content: string
}


export type TripReviewApiResponse = {
    id: string,
    trip_id: string,
    rating: number,
    reviewer: string,
    title: string,
    content: string,
    image_path: null | string,
    approved: boolean,
    created_at: Date
}