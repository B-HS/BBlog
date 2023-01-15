import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import articleReducer from "./Slice/articleSlice";
import memberReducer from "./Slice/memberSlice";
import replyReducer from "./Slice/replySlice";


const rootReducer = combineReducers({
    article: articleReducer,
    reply: replyReducer,
    member: memberReducer,
})

export const makeStore = () => {
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {},
})
return store;
};
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
