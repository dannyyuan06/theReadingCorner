import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import pageReducer from './features/pageSlice'
import bulletinReducer from './features/bulletinSlice'
import { TypedUseSelectorHook, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        authReducer,
        pageReducer,
        bulletinReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector