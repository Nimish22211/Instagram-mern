import { configureStore } from "@reduxjs/toolkit";
import AuthUserSlice from "./Redux/AuthUser";
export const store = configureStore({
    reducer: {
        AuthUserSlice
    }
})