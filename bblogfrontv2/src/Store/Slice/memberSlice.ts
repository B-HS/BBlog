import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { member } from "../../Typings/type";
import type { RootState } from "../store";

const initialState: member = {
    member: [],
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

export const memberSlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    extraReducers(builder) {},
});

export const {} = memberSlice.actions;
export const selectAllmember = (state: RootState) => state.member;
export default memberSlice.reducer;
