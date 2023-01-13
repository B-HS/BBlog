import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reply } from "../../Typings/type";
import type { RootState } from "../store";

const initialState: reply = {
    reply: [],
    Loading: false,
    Done: false,
    Error: null,
    setStatus: function (stat: string, action?: PayloadAction) {
        switch (stat) {
            case "pending":
                this.Loading = true;
                this.Done = false;
                this.Error = null;
            case "fulfilled":
                this.Loading = false;
                this.Done = true;
            case "rejected":
                this.Loading = false;
                this.Error = action?.payload;
            default:
                break;
        }
    },
};

export const replySlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    extraReducers(builder) {},
});

export const {} = replySlice.actions;
export const selectAllReply = (state: RootState) => state.reply;
export default replySlice.reducer;
