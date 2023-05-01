import { authCheck, login, requestAddArticle, requestAddComment, requestArticleList, requestCommentList, requestDeleteComment, requestEditComment, uploadImage } from "@/ajax/ajax";
import { article, comment } from "@/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface globalState {
    loading: boolean;
    auth: boolean;
    articles: article[];
    total: number;
    comments: comment[];
    commentTotal: number;
}

const initialState: globalState = {
    auth: false,
    loading: false,
    articles: [],
    comments: [],
    total: Number.MAX_SAFE_INTEGER,
    commentTotal: Number.MAX_SAFE_INTEGER,
};
export const global = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        resetAll: (state) => {
            state.articles = [];
            state.total = Number.MAX_SAFE_INTEGER;
            state.loading = false;
            state.auth = false;
        },
        resetArticleInfo: (state) => {
            state.articles = [];
            state.total = Number.MAX_SAFE_INTEGER;
        },
        resetCommentInfo: (state) => {
            state.comments = [];
            state.commentTotal = Number.MAX_SAFE_INTEGER;
        },
    },
    extraReducers(builder) {
        builder.addCase(authCheck.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        });
        builder.addCase(authCheck.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authCheck.fulfilled, (state, action: PayloadAction<boolean>) => {
            action.payload ? (state.auth = true) : (state.auth = false);
            state.loading = false;
        });

        builder.addCase(login.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        });
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
            action.payload === "logged" ? (state.auth = true) : (state.auth = false);
            state.loading = false;
        });

        builder.addCase(uploadImage.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(requestArticleList.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestArticleList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestArticleList.fulfilled, (state, action: PayloadAction<{ total: number; articles: article[] }>) => {
            console.log(action.payload);

            if (action.payload.articles) {
                state.articles = [...state.articles, ...action.payload.articles];
                state.total = action.payload.total;
                state.loading = false;
            } else {
                resetArticleInfo();
            }
        });

        builder.addCase(requestAddComment.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestAddComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestAddComment.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(requestCommentList.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestCommentList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestCommentList.fulfilled, (state, action: PayloadAction<{ total: number; comments: comment[] }>) => {
            console.log(action.payload);
            if (action.payload.comments) {
                state.comments = [...state.comments, ...action.payload.comments];
                state.commentTotal = action.payload.total;
                state.loading = false;
            } else {
                resetCommentInfo();
            }
        });

        builder.addCase(requestAddArticle.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestAddArticle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestAddArticle.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(requestDeleteComment.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestDeleteComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestDeleteComment.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(requestEditComment.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(requestEditComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestEditComment.fulfilled, (state) => {
            state.loading = false;
        });
    },
});

export const { resetArticleInfo, resetCommentInfo, resetAll } = global.actions;
export default global.reducer;
