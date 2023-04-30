import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "typescript-cookie";

export const authCheck = createAsyncThunk("user/token", async () => {
    const token = typeof Cookies.get("token") !== "undefined" ? Cookies.get("token")?.toString() : "no token";
    const { data } = await axios.post("/v1/article/check", { aid: 0 }, { headers: { token: "Bearer " + token!, "Content-Type": "application/json" } });
    return data;
});

export const login = createAsyncThunk("/user/login", async (loginInfo: { id: string; pw: string }) => {
    const { data } = await axios.post("/v1/login", { adminId: loginInfo.id, password: loginInfo.pw });
    return data;
});

export const uploadImage = createAsyncThunk("/user/login", async (file: FormData) => {
    const { data } = await axios.post("/v1/image/upload", { file }, {headers:{'Content-Type': 'multipart/form-data'}});
    return data;
});
