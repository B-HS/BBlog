import { createSlice } from "@reduxjs/toolkit";
import { article as articleProps } from "@/app";

export interface articleState {
    article: articleProps[],
    articleDetail: null,
    tabIndex: 0,
    page: 0,
    size: 5,
    total: 999,
    Loading: false,
    Done: false,
    Error: null,
}

const initialState: articleState = {
    article: [],
    articleDetail: null,
    tabIndex: 0,
    page: 0,
    size: 5,
    total: 999,
    Loading: false,
    Done: false,
    Error: null,
};

export const article = createSlice({
    name: "article",
    initialState,
    reducers: {
        // setTabIndex: (state, action: PayloadAction<number>) => {
        //     state.tabIndex = action.payload;
        // },
    },
    extraReducers(builder) {
        // builder.addCase(getTagerArticleInformaiton.pending, (state) => {
        //     state.Loading = true;
        //     state.Done = false;
        //     state.Error = null;
        // });
        // builder.addCase(getTagerArticleInformaiton.fulfilled, (state, action: PayloadAction<articleInfo>) => {
        //     state.Loading = false;
        //     state.Done = true;
        //     state.articleDetail = JSON.parse(JSON.stringify(action.payload));
        // });
        // builder.addCase(getTagerArticleInformaiton.rejected, (state, action) => {
        //     state.Loading = false;
        //     state.Error = action.payload;
        // });
    },
});

export const {  } = article.actions;
export default article.reducer;