import { createSlice } from "@reduxjs/toolkit";

type Authentication = {
    isAuthenticated: boolean;
    getUserLoading: boolean;
    user: any;
    balance?: number;
    balanceLoading? : boolean;
    loginFormIsOpen?: boolean;
};

const initialState: Authentication = {
    isAuthenticated: false,
    getUserLoading: false,
    user: {},
    balance: undefined,
    balanceLoading: false,
    loginFormIsOpen: false
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setReduxUser: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.getUserLoading = action.payload.getUserLoading;
        },
        setReduxBalance: (state, action) => {
            state.balance = action.payload.balance;
            state.balanceLoading = action.payload.loading;
        },
        openLoginForm : (state) =>{
            state.loginFormIsOpen = true;
        },
        closeLoginForm : (state) =>{
            state.loginFormIsOpen = false;
        }

    }
});

export const { setReduxUser, setReduxBalance, closeLoginForm, openLoginForm } = authenticationSlice.actions

export default authenticationSlice.reducer;