import { configureStore } from "@reduxjs/toolkit";
import global from "./global/global";


export const store = configureStore({
    reducer: { global: global },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;
