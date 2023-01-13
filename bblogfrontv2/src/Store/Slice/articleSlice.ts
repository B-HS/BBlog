import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { article } from "../../Typings/type";
import { articleAsync } from "../Async/articleAsync";
import type { RootState } from "../store";

const initialState: article = {
    article: [],
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

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(articleAsync.requestArticleList.pending, (state) => state.setStatus("pending")),
        builder.addCase(articleAsync.requestArticleList.fulfilled, (state, action) => {
            state.setStatus("fulfilled");
            state.article = [...state.article, ...action.payload];
        }),
        builder.addCase(articleAsync.requestArticleList.rejected, (state, action) => state.setStatus("rejected", action));
    },
});

export const {} = articleSlice.actions;
export const selectAllArticle = (state: RootState) => state.article;
export default articleSlice.reducer;
