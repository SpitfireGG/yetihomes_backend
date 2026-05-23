export type PostCurrencyProps = {
    name: string;
    code: string;
    symbol: string;
    id?:string
}

export type PatchCurrencyProps = {
    name: string;
    code: string;
    symbol: string;
    id:string
}


interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
  created_at: string;
  updated_at: string;
}

export interface CurrencyApiResponse {
  timestamp: string;
  success: boolean;
  status: number;
  message: string;
  data: Currency[];
  errors: null | any;
}
