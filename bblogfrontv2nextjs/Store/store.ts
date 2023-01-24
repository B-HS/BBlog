import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { article, member, reply } from "../Typings/type";
import articleReducer from "./Slice/articleSlice";
import memberReducer from "./Slice/memberSlice";
import replyReducer from "./Slice/replySlice";

export interface State {
    article: article;
    reply: reply;
    member: member;
}

const rootReducer = (state: State, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return combineReducers({
        article: articleReducer,
        reply: replyReducer,
        member: memberReducer,
    })(state, action);
};

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer as Reducer<State, AnyAction>,
        devTools: process.env.NODE_ENV !== "production",
        preloadedState: {},
    });
    return store;
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV === "development",
    serializeState: (state) => JSON.stringify(state),
    deserializeState: (state) => JSON.parse(state),
});

export default wrapper;
