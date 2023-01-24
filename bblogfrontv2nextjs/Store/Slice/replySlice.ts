import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reply, replyListAxios } from "../../Typings/type";
import { replyGuestDelete, replyGuestModify, replyGuestWrite, replyListReuqest, replyListReuqestMore, replyUserDelete, replyUserModify, replyUserWrite } from "../Async/replyAsync";

const initialState: reply = {
    reply: [],
    totalReply: 999,
    Loading: false,
    Done: false,
    Error: null,
};

export const replySlice = createSlice({
    name: "reply",
    initialState,
    reducers: {
        clearReply: (state) => {
            state.reply = [];
            state.totalReply = Math.random() * 999;
        },
    },
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

        builder.addCase(replyGuestModify.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyGuestModify.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyGuestModify.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyUserModify.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyUserModify.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyUserModify.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyGuestDelete.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyGuestDelete.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyGuestDelete.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyUserDelete.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyUserDelete.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyUserDelete.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyUserWrite.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyUserWrite.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(replyUserWrite.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyListReuqest.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyListReuqest.fulfilled, (state, action: PayloadAction<replyListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.reply = [...action.payload.replies];
            state.totalReply = action.payload.total;
        });
        builder.addCase(replyListReuqest.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(replyListReuqestMore.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(replyListReuqestMore.fulfilled, (state, action: PayloadAction<replyListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.reply = [...state.reply, ...action.payload.replies];
            state.totalReply = action.payload.total;
        });
        builder.addCase(replyListReuqestMore.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });
    },
});
export const { clearReply } = replySlice.actions;
export default replySlice.reducer;
