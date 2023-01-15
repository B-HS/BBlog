import { createSlice } from "@reduxjs/toolkit";
import { member } from "../../Typings/type";

const initialState: member = {
    member: [],
    Loading: false,
    Done: false,
    Error: null,
};

export const memberSlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    extraReducers(builder) {},
});

export default memberSlice.reducer;
