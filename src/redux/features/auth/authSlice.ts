/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
export type TUser = {
    [x: string]: any;
    email: string;
    role: string;
    phone: string;
    name: string;
    address: string;
    iat: number;
    exp: number;
}


type TAuthState = {
    user: null | TUser;
    token: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;