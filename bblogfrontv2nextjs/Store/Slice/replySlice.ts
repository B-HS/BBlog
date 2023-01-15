import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reply, replyListAxios } from "../../Typings/type";
import { replyGuestWrite, replyListReuqest } from "../Async/replyAsync";

const initialState: reply = {
    reply: [],
    Loading: false,
    Done: false,
    Error: null,
};

export const replySlice = createSlice({
    name: "reply",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(replyGuestWrite.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyGuestWrite.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyGuestWrite.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyListReuqest.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyListReuqest.fulfilled, (state, action:PayloadAction<replyListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.reply = [...action.payload.replies]
        });
        builder.addCase(replyListReuqest.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });
    },
});

export default replySlice.reducer;
