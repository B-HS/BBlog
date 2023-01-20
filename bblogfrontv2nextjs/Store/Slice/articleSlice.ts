import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { article, articleInfo, articleListAxios } from "../../Typings/type";
import { imgUpload, reqeustArticleDetail, requestArticleList, requestIntro, requestMoreArticleList, requestMoreSearch, requestSearchList, write } from "../Async/articleAsync";

const initialState: article = {
    article: [],
    articleDetail: null,
    tabIndex: 0,
    page: 0,
    size: 5,
    totalArticle: 999,
    Loading: false,
    Done: false,
    Error: null,
    imgName: [],
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setTabIndex: (state, action: PayloadAction<number>) => {
            state.tabIndex = action.payload;
        },
        clearImgName: (state) => {
            state.imgName = null;
        },
        clearArticles: (state) => {
            state.article = []
            state.totalArticle = Math.random()*999
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
            state.totalArticle = action.payload.total      
        }),
        builder.addCase(requestArticleList.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(requestSearchList.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        }),
        builder.addCase(requestSearchList.fulfilled, (state, action: PayloadAction<articleListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.article = [...action.payload.articles];
            state.totalArticle = action.payload.total 
        }),
        builder.addCase(requestSearchList.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(requestMoreArticleList.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        }),
        builder.addCase(requestMoreArticleList.fulfilled, (state, action: PayloadAction<articleListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.article = [...state.article,...action.payload.articles];
            state.totalArticle = action.payload.total
        }),
        builder.addCase(requestMoreArticleList.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
            
        });

        builder.addCase(requestMoreSearch.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        }),
        builder.addCase(requestMoreSearch.fulfilled, (state, action: PayloadAction<articleListAxios>) => {
            state.Loading = false;
            state.Done = true;
            state.article = [...state.article,...action.payload.articles];
            state.totalArticle = action.payload.total
        }),
        builder.addCase(requestMoreSearch.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(imgUpload.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        }),
        builder.addCase(imgUpload.fulfilled, (state) => {
            state.Loading = false;
            state.Done = true;
        }),
        builder.addCase(imgUpload.rejected, (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        });

        builder.addCase(requestIntro.pending, (state) => {
            state.Loading = true;
            state.Done = false;
            state.Error = null;
        });
        builder.addCase(requestIntro.fulfilled, (state, action: PayloadAction<articleInfo>) => {
            state.Loading = false;
            state.Done = true;
            state.articleDetail = action.payload;
        });
        builder.addCase(requestIntro.rejected, (state, action) => {
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

export const { setTabIndex, clearImgName, clearArticles } = articleSlice.actions;
export default articleSlice.reducer;
