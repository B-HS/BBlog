import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleInfo, imgUploadAxios, listRequest } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";
import axiosMultiform from "./axiosConfig/axiosMultiform";

export const requestArticleList = createAsyncThunk("article/list", async (request: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/article/menu/${request.menu}/${request.page}/${request.size}`);
    return data;
});

export const requestMoreArticleList = createAsyncThunk("article/list/more", async (request: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/article/menu/${request.menu}/${request.page}/${request.size}`);
    return data;
});

export const requestSearchList = createAsyncThunk("article/search", async (request: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/article/search/${request.keyword}/${request.page}/${request.size}`);
    return data;
});

export const requestMoreSearch = createAsyncThunk("article/serach/more", async (request: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/article/search/${request.keyword}/${request.page}/${request.size}`);
    return data;
});

export const reqeustArticleDetail = createAsyncThunk("article/read", async (num: string | string[]) => {
    const { data } = await axiosJSON.get(`/blogapi/article/${num}`);
    return data;
});

export const write = createAsyncThunk("article/write", async (info: articleInfo) => {
    const { data } = await axiosJSON.post(`/blogapi/article/write`, info, {headers:{"access": info.access, "refresh": info.refresh}});
    return data;
});

export const requestIntro = createAsyncThunk("article/intro", async () => {
    const { data } = await axiosJSON.get(`/blogapi/article/intro`);
    return data;
});

export const imgUpload = createAsyncThunk("article/uploadImage", async (formData: imgUploadAxios) => {
    const { data } = await axiosMultiform.post(`/blogapi/image/upload`, formData.data, {headers:{"access": formData.access, "refresh": formData.refresh}});
    return data;
});