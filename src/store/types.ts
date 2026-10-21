import {rootReducer, store} from "./index.ts";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppSelector<T> = (state: RootState) => T;
export type AppActionReducer<S, P> = (state: S, payload: P) => void;
export type AppActionReducerType<S, P> = {
    reducer: AppActionReducer<S, P>;
    payload: P;
}