import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleInfo, listRequest } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";

export const requestArticleList = createAsyncThunk("article/list", async (request: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/article/${request.menu}/${request.page}/${request.size}`);
    return data;
});

export const reqeustArticleDetail = createAsyncThunk("article/read", async (num: string|string[]) => {
    const { data } = await axiosJSON.get(`/blogapi/article/${num}`)
    return data
});

export const write = createAsyncThunk("article/write", async (info: articleInfo) => {
    const { data } = await axiosJSON.post(`/blogapi/article/write`, info)
    return data
});



