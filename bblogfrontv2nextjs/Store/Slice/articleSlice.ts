import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { article, articleInfo, articleListAxios } from "../../Typings/type";
import { reqeustArticleDetail, requestArticleList, write } from "../Async/articleAsync";

const initialState: article = {
    article: [],
    articleDetail: null,
    tabIndex: 0,
    page: 0,
    size: 5,
    Loading: false,
    Done: false,
    Error: null,
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setTabIndex: (state, action: PayloadAction<number>) => {
            state.tabIndex = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(requestArticleList.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        }),
            builder.addCase(requestArticleList.fulfilled, (state, action: PayloadAction<articleListAxios>) => {
                state.Loading = false;
                state.Done = true;
                state.article = [...action.payload.articles];
            }),
            builder.addCase(requestArticleList.rejected, (state, action) => {
                state.Loading = false;
                state.Error = action.payload;
            });

        builder.addCase(write.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(write.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        });
        builder.addCase(write.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(reqeustArticleDetail.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(reqeustArticleDetail.fulfilled, (state, action: PayloadAction<articleInfo>) => {
            state.Loading = false;
            state.Done = true;
            state.articleDetail = JSON.parse(JSON.stringify(action.payload));
        });
        builder.addCase(reqeustArticleDetail.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });
    },
});

export const { setTabIndex } = articleSlice.actions;
export default articleSlice.reducer;
