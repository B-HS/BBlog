import { createAsyncThunk } from "@reduxjs/toolkit";
import { listRequest, replyInfo } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";
import axiosUSER from "./axiosConfig/axiosUSER";

export const replyGuestWrite = createAsyncThunk("reply/write/guest", async (info: replyInfo) => {
    const { data } = await axiosJSON.post(`/blogapi/reply/write/guest`, info);
    return data;
});

export const replyUserWrite = createAsyncThunk("reply/write/user", async (info: replyInfo) => {
    const { data } = await axiosUSER.post(`/blogapi/reply/write/user`, info);
    return data;
});

export const replyListReuqest = createAsyncThunk("reply/list", async (info: listRequest) => {
    const { data } = await axiosJSON.get(`/blogapi/reply/${info.aid}/${info.page}/${info.size}`);
    return data;
});
