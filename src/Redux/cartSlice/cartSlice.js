import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    quantity: 0,
    total: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToCart(state, actions) {

            // state.quantity++
            const item = state.cartItems.find((data) => data.id === actions.payload.id)

            if (item === undefined) {
                const newItem = { ...actions.payload }
                // console.log("newitem",newItem);
                newItem['quantity'] = 1
                state.cartItems.push(newItem)
                state.quantity++
                state.total += parseFloat(newItem.price)
            }
            else {
                item.quantity++
                state.quantity++
                state.total += parseFloat(item.price)
            }
        },
        RemoveFromCart(state, actions) {
            const item = state.cartItems.find(item => item.id === actions.payload.id)
            if (state.cartItems.length === 0) {
                state.total = 0
            }
            else {

                if (item.quantity === 1) {
                    state.cartItems.splice(state.cartItems.indexOf(item), 1)
                    state.quantity--
                    state.total -= parseFloat(item.price)

                } else {
                    item.quantity--
                    state.quantity--
                    state.total -= parseFloat(item.price)

                }
            }
        }
    }
})

export const cartActions = cartSlice.actions
