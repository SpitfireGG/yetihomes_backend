export type FaqCategoryFormData = {
    display_order: number;
    translations: {
        language_id: string;
        title: string;
    }[]
}

export type FaqCategoryApiResponse = {
    id: string;
    display_order: number;
    translations: {
        language_id: string;
        title: string;
        language: {
            name: string
        }
    }[]
}

export type FaqCategoryByIdApiResponse = {
    id: string;
    display_order: number;
    translations: {
        language_id: string;
        title: string;
    }[]
}

export type TripFaqFormData = {
    display_order: number;
    faq_category_id: string,
    translations: {
        language_id: string;
        question: string;
        answer: string;
    }[]
}

export type TripFaqApiResponse = {
    id: string;
    faq_category_id: string,
    trip_id: string,
    display_order: number;
    translations: {
        language_id: string;
        question: string;
        answer: string;
    }[]
    category: {
        translations: {
            title: string
        }[]
    }
}