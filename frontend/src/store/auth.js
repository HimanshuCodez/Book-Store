import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        role:"user",    
    },
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){  
            state.isLoggedIn = false;
          
        },
        changeRole (state, action){
            state.role = action.payload;
            state.role =role;
        }
    }
})

export const authActions = authSlice.authActions;

export default authSlice.reducer; 