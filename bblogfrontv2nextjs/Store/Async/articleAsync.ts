import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosJSON from "./axiosConfig/axiosJSON";


export const articleAsync = {
    requestArticleList: createAsyncThunk("article/list", async (menu: string) => {
        const { data } = await axiosJSON.get(`/blogapi/article${menu}`);
        return data;
    }),
};
