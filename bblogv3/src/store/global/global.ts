import { authCheck, login } from "@/ajax/ajax";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    extraReducers(builder) {
        builder.addCase(authCheck.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        });
        builder.addCase(authCheck.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authCheck.fulfilled, (state, action: PayloadAction<boolean>) => {
            action.payload ? (state.auth = true) : (state.auth = false);
            state.loading = false;
        });

        builder.addCase(login.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
            action.payload === "logged" ? (state.auth = true) : (state.auth = false);
            state.loading = false;
            console.log(state.auth);
        });
    },
});

export const {} = global.actions;
export default global.reducer;
