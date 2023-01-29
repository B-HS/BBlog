import { createAsyncThunk } from "@reduxjs/toolkit";
import { listRequest, replyInfo } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";

export const replyGuestWrite = createAsyncThunk("reply/write/guest", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/write/guest`, info);
    return data;
});

export const replyUserWrite = createAsyncThunk("reply/write/user", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/write/user`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const replyListReuqest = createAsyncThunk("reply/list", async (info: listRequest) => {
    const { data } = await axiosJSON.get(`/v1/reply/${info.aid}/${info.page}/${info.size}`);
    return data;
});

export const replyListReuqestMore = createAsyncThunk("reply/list/more", async (info: listRequest) => {
    const { data } = await axiosJSON.get(`/v1/reply/${info.aid}/${info.page}/${info.size}`);
    return data;
});

export const replyGuestDelete = createAsyncThunk("reply/delete/guest", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/delete/guest`, info);
    return data;
});

export const replyUserDelete = createAsyncThunk("reply/delete/user", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/delete/user`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const replyGuestModify = createAsyncThunk("reply/modify/guest", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/modify/guest`, info);
    return data;
});

export const replyUserModify = createAsyncThunk("reply/modify/user", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/v1/reply/modify/user`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});
