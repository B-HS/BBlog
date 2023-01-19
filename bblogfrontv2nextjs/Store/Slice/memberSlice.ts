import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { member, memberInfo, token } from "../../Typings/type";
import { adminChecker, emailAuthCodeRequest, emailAuthProvement, emailDuplicateCheck, join, login, logout, tokenRefresher } from "../Async/memberAsync";

const initialState: member = {
    member: null,
    authorized: false,
    duplicated: true,
    authMailSent: false,
    access: "",
    refresh: "",
    Loading: false,
    Done: false,
    Error: null,
};

export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        setUserInfo: (state, action:PayloadAction<memberInfo>)=>{
            state.member = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(join.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(join.fulfilled, (state, action: PayloadAction<number>) => {
            state.Loading = false;
            state.Done = true;
            if (action.payload > 0) {
                state.authorized = false;
                state.duplicated = true;
                state.authMailSent = false;
            }
        });
        builder.addCase(join.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(login.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(adminChecker.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(adminChecker.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(adminChecker.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(logout.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(emailDuplicateCheck.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(emailDuplicateCheck.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.Loading = false;
            state.Done = true;
            state.duplicated = action.payload;
        });
        builder.addCase(emailDuplicateCheck.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(emailAuthCodeRequest.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(emailAuthCodeRequest.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.Loading = false;
            state.Done = true;
            state.authMailSent = action.payload;
        });
        builder.addCase(emailAuthCodeRequest.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(emailAuthProvement.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(emailAuthProvement.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.Loading = false;
            state.Done = true;
            state.authorized = action.payload;
        });
        builder.addCase(emailAuthProvement.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(tokenRefresher.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(tokenRefresher.fulfilled, (state, action: PayloadAction<token>) => {
            state.Loading = false;
            state.Done = true;            
            state.access = action.payload.access
            state.refresh = action.payload.refresh
        });
        builder.addCase(tokenRefresher.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });
    },
});
export const { setUserInfo } = memberSlice.actions
export default memberSlice.reducer;
