import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import articleReducer from "./Slice/articleSlice";
import memberReducer from "./Slice/memberSlice";
import replyReducer from "./Slice/replySlice";

const store = configureStore({
    reducer: {
        article: articleReducer,
        reply: replyReducer,
        member: memberReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
