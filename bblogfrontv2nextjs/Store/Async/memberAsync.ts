import { createAsyncThunk } from "@reduxjs/toolkit";
import { memberAuthcodeAxios, memberJoinAxios, memberLoginAxios, token } from "../../Typings/type";
import axiosJSON from "./axiosConfig/axiosJSON";

export const join = createAsyncThunk("member/join", async (info: memberJoinAxios) => {
    const { data } = await axiosJSON.post(`/v1/member/join`, info);
    return data;
});

export const login = createAsyncThunk("member/login", async (info: memberLoginAxios) => {
    const { data } = await axiosJSON.post("/v1/member/login", info);
    return data;
});

export const emailDuplicateCheck = createAsyncThunk("member/emailcheck", async (info: string) => {
    const { data } = await axiosJSON.post(`/v1/member/emaildup`, { email: info });
    return data;
});

export const emailAuthCodeRequest = createAsyncThunk("member/coderequest", async (info: string) => {
    const { data } = await axiosJSON.post(`/v1/member/emailauth`, { email: info });
    return data;
});

export const emailAuthProvement = createAsyncThunk("member/authprooe", async (info: memberAuthcodeAxios) => {
    const { data } = await axiosJSON.post(`/v1/member/authprove`, { email: info.email, mid: info.authcode });
    return data;
});

export const tokenRefresher = createAsyncThunk("member/refreshtoken", async (info: token) => {
    const { data } = await axiosJSON.post(`/v1/member/token`, info);
    return data;
});

export const adminChecker = createAsyncThunk("member/admin", async (info: token) => {
    const { data } = await axiosJSON.post(`/v1/member/admin`, info, { headers: { access: info.access, refresh: info.refresh } });
    return data;
});

export const logout = createAsyncThunk("member/logout", async (info: token) => {
    const { data } = await axiosJSON.post(`/v1/member/logout`, info);
    return data;
});

export const adminCookie = createAsyncThunk("member/adminCookieChecker", async (info: token) => {
    const { data } = await axiosJSON.post(`/v1/member/admincookie`, info);
    return data;
});
