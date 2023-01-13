import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from "react-redux";
import articleReducer from "./Slice/articleSlice";
import memberReducer from "./Slice/memberSlice";
import replyReducer from "./Slice/replySlice";

export const makeStore = () => {
const store = configureStore({
    reducer: {
        article: articleReducer,
        reply: replyReducer,
        member: memberReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {},
})
return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;

const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
