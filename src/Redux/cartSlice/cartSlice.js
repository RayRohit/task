import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:[],
    quantity:0,
    total:0
}
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
     AddToCart(state,actions){
        
        // state.quantity++
        const item = state.cartItems.find((data)=>data.id === actions.payload.id)
        
        if(item===undefined){
            const newItem = {...actions.payload}
        // console.log("newitem",newItem);
        newItem['quantity'] = 1
        state.cartItems.push(newItem)
        state.quantity++
        }
        else{
            item.quantity++
            state.quantity++
        }
    } 
    }
})

export const cartActions = cartSlice.actions
