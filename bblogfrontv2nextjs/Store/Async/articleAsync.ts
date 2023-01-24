import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { articleInfo, articleRequestAxios, imgUploadAxios, listRequest } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";
import axiosMultiform from "./axiosConfig/axiosMultiform";
import AXIOS_URL from "./axiosConfig/URL";

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
    const { data } = await axios.get(`${AXIOS_URL}/blogapi/article/${num}`);
    return data;
});

export const write = createAsyncThunk("article/write", async (info: articleInfo) => {
    const { data } = await axiosJSON.post(`/blogapi/article/write`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const requestIntro = createAsyncThunk("article/intro", async () => {
    const { data } = await axios.get(`${AXIOS_URL}/blogapi/article/intro`);
    return data;
});

export const imgUpload = createAsyncThunk("article/uploadImage", async (formData: imgUploadAxios) => {
    const { data } = await axiosMultiform.post(`/blogapi/image/upload`, formData.data, { headers: { access: formData.access, refresh: formData.refresh } });
    return data;
});

export const getTagerArticleInformaiton = createAsyncThunk("article/modify/getinfo", async (info: articleRequestAxios) => {
    const { data } = await axiosJSON.post("/blogapi/article/modifyinfo", {aid:info.aid}, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const modifyRequest = createAsyncThunk("article/modify", async (info: articleInfo) => {
    const { data } = await axiosJSON.post("/blogapi/article/modify", info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const removeRequest = createAsyncThunk("article/remove", async (info: articleRequestAxios) => {
    const { data } = await axiosJSON.post(`/blogapi/article/remove/${info.aid}`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});
