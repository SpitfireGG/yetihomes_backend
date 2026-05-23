import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface currencyState {
    name: string;
    code: string;
    symbol: string;
    states: {
        isOpen?: boolean;
        isError?: boolean;
        isLoading: boolean;
    }
}

const initialState: currencyState = {
    name: '',
    code: '',
    symbol: '',
    states: {
        isOpen: false,
        isError: false,
        isLoading: false
    }
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        onChangeHandle: (state, action: PayloadAction<{ field: 'name' | 'code' | 'symbol', value: string }>) => {
            state[action.payload.field] = action.payload.value
        },

        onHandelSubmit: () => {

        }
    }
})


export const { onChangeHandle } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;