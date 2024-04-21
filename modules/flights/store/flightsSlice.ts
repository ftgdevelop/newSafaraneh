import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

type FlightsFilters = {
    filterOption: {
        airlineOption: string[],
        flightTimeOption: { minTime: number, maxTime: number, filterName: string }[],
        cabinClassOption: string[],
        ticketTypeOption: string[],
        priceRangeOption?: {min: number, max: number}
    }
    SearchChangeOn: boolean;
}

const initialState: FlightsFilters = {
    filterOption: {
        airlineOption: [],
        flightTimeOption: [],
        cabinClassOption: [],
        ticketTypeOption: [],
    },
    SearchChangeOn: false,
}

export const flightSlice = createSlice({
    name: 'flightSlice',
    initialState: initialState,
    reducers: {
        setAirlineFilter: (state, action) => {
            state.filterOption.airlineOption = action.payload
        },
        setFlightTimeFilter: (state, action) => {
            state.filterOption.flightTimeOption = action.payload
        },
        setCabinClassFilter: (state, action) => {
            state.filterOption.cabinClassOption = action.payload
        },
        setTicketTypeFilter: (state, action) => {
            state.filterOption.ticketTypeOption = action.payload
        },
        setPriceRangeFilter: (state, action) => {
            state.filterOption.priceRangeOption = action.payload
        },
        setSearchChangeOn: (state, action) => {
            state.SearchChangeOn = action.payload
        },
    }
})

export const { setAirlineFilter, setFlightTimeFilter, setCabinClassFilter,
setTicketTypeFilter, setPriceRangeFilter, setSearchChangeOn} = flightSlice.actions

export default flightSlice.reducer;