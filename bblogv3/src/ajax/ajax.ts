import { article, comment } from "@/app";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "typescript-cookie";

export const authCheck = createAsyncThunk("user/token", async () => {
    const token = typeof Cookies.get("token") !== "undefined" ? "Bearer " + Cookies.get("token")?.toString() : null;
    if (token) {
        const { data } = await axios.post("/v1/article/check", { aid: 0 }, { headers: { token: token, "Content-Type": "application/json" } });
        return data;
    }
    return;
});

export const login = createAsyncThunk("/user/login", async (loginInfo: { id: string; pw: string }) => {
    const { data } = await axios.post("/v1/login", { adminId: loginInfo.id, password: loginInfo.pw });
    return data;
});

export const uploadImage = createAsyncThunk("/user/upload", async (file: FormData) => {
    const { data } = await axios.post("/v1/image/upload", file, { headers: { "Content-Type": "multipart/form-data" } });
    return data;
});

export const requestArticleList = createAsyncThunk("/article/list", async (info: { page: number; size: number; menu: string }) => {
    const { data } = await axios.post("/v1/article/list", info);
    return data;
});

export const requestAddArticle = createAsyncThunk("/article/add", async (info: article) => {
    const token = typeof Cookies.get("token") !== "undefined" ? "Bearer " + Cookies.get("token")?.toString() : null;
    const { data } = await axios.post("/v1/article/write", info, { headers: { token: token, "Content-Type": "application/json" } });
    return data;
});

export const requestCommentList = createAsyncThunk("/comment/list", async (info: { page: number; size: number; aid: string }) => {
    const { data } = await axios.post("/v1/comment/list", info);
    return data;
});

export const requestAddComment = createAsyncThunk("/article/comment/add", async (info: comment) => {
    const { data } = await axios.post("/v1/comment/write", info);
    return data;
});

export const requestDeleteComment = createAsyncThunk("/article/comment/delete", async (info: comment) => {
    const { data } = await axios.post("/v1/comment/delete", info);
    return data;
});
export const requestEditComment = createAsyncThunk("/article/comment/edit", async (info: comment) => {
    const { data } = await axios.post("/v1/comment/modify", info);
    return data;
});



