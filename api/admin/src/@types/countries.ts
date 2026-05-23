export type PostCountryProps = {
    name: string;
    code: string;
    language_ids: string[];
    currency_ids: string[];
}

export type PatchCountryProps = {
    id: string;
    name: string;
    code: string;
    language_ids: string[];
    currency_ids: string[];
}


interface Country {
    id: string;
    name: string;
    code: string;
    languages: [
        {
            language: {
                id: string;
                name: string;
                code: string
            }
        }
    ];
    currencies: [
        {
            currency: {
                id: string;
                name: string;
                code: string;
                symbol: string
            }
        }
    ]
}

export interface CountryApiResponse {
    timestamp: string;
    success: boolean;
    status: number;
    message: string;
    data: Country[]
    errors: null | any;
}
