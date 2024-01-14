import { createSlice } from "@reduxjs/toolkit";

type StylesInfo = {
    bodyScrollable: boolean;
    headerUnderMain: boolean;
};

const initialState: StylesInfo = {
    bodyScrollable: true,
    headerUnderMain: false
};

export const stylesSlice = createSlice({
    name: "styles",
    initialState,
    reducers: {
        setBodyScrollable: (state, action) => {
            state.bodyScrollable = action.payload;
        },
        setHeaderUnderMain: (state, action) => {
            state.headerUnderMain = action.payload;
        }
    }
});

export const { setBodyScrollable, setHeaderUnderMain } = stylesSlice.actions

export default stylesSlice.reducer;