import { createSlice } from "@reduxjs/toolkit";

type busFilters = {
    filterOption: {
        busComponies: string[],
        time: { minTime: number, maxTime: number, filterName: string }[],
        cabinClassOption: string[],
        ticketTypeOption: string[],
        priceRange?: {min: number, max: number}
    }
    SearchChangeOn: boolean;
}

const initialState: busFilters = {
    filterOption: {
        busComponies: [],
        time: [],
        cabinClassOption: [],
        ticketTypeOption: [],
    },
    SearchChangeOn: false,
}

export const busSlice = createSlice({
    name: 'busSlice',
    initialState: initialState,
    reducers: {
        setBusComponies: (state, action) => {
            state.filterOption.busComponies = action.payload
        },
        setTime: (state, action) => {
            state.filterOption.time = action.payload
        },
        setPriceRange: (state, action) => {
            state.filterOption.priceRange = action.payload
        },
        setSearchChangeOn: (state, action) => {
            state.SearchChangeOn = action.payload
        }
    }
})

export const { setBusComponies, setTime, setPriceRange, setSearchChangeOn } = busSlice.actions;
export default busSlice.reducer;