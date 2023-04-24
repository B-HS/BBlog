import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface globalState {
    loading: boolean;
    auth: boolean;
}

const initialState: globalState = {
    auth: false,
    loading: false,
};

export const global = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        reset: (state) => {
            state.loading = false;
            state.auth = false;
        },
    },
});

export const {} = global.actions;
export default global.reducer;
