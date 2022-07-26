import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router-dom";


const initialState = {
    isLogin: false,
    error: '',
    users:[],
    loggedUser:null
}

export const LogCheck = createAsyncThunk('login/LogCheck', (people)=>{
    console.log();
    try {
        const url = 'http://localhost:3000/Users' 
        return axios.get(url).then((res)=>res.data).catch((err)=>err)
    } catch (err) {
        return console.log(err);
    }

})

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const user = state.users.find((user) => user.email===action.payload.email && user.pass === action.payload.pass)
            state.loggedUser = user
            if(user === undefined){
                state.error = "invalid Credentials"
            }
            else{
                state.isLogin = true
            }
        },
        logout(state, action) {
            state.isLogin = action.payload
        }
    },
    extraReducers:{
        [LogCheck.pending] :(state) => {
            state.isLogin=false
        },
        [LogCheck.fulfilled]:(state,action)=>{
            state.users = action.payload
            
        }
    }
})
export const AuthActions = AuthSlice.actions

