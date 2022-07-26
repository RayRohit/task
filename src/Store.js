import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./Redux/Auth/AuthSlice";
import { cartSlice } from "./Redux/cartSlice/cartSlice";

export const store = configureStore({
    reducer:{
        auth:AuthSlice.reducer,
        cart:cartSlice.reducer
    }
})