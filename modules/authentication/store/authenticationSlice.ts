import { createSlice } from "@reduxjs/toolkit";
import { UserInformation } from "../types/authentication";

type Authentication = {
    isAuthenticated: boolean;
    getUserLoading: boolean;
    user?: UserInformation | undefined;
    balance?: number;
    balanceLoading? : boolean;
    loginFormIsOpen?: boolean;
    loginToContinueReserve?: boolean;
};

const initialState: Authentication = {
    isAuthenticated: false,
    getUserLoading: false,
    user: undefined,
    balance: undefined,
    balanceLoading: false,
    loginFormIsOpen: false,
    loginToContinueReserve:false
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
        },
        setLoginToContinueReserve:(state, action) => {
            state.loginToContinueReserve = action.payload;
        }

    }
});

export const { setReduxUser, setReduxBalance, closeLoginForm, openLoginForm , setLoginToContinueReserve} = authenticationSlice.actions

export default authenticationSlice.reducer;