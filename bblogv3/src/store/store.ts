import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import article from "./article/article";
import { articleState } from "@/app";
import { hydrate } from "react-dom";

export interface State {
    article: articleState;
}

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === hydrate) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return combineReducers({
        article: article,
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