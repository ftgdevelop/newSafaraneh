import { createSlice } from "@reduxjs/toolkit";

type FlightsFilters = {
    filterOption: {
        airlineOption: string[],
        flightTimeOption: { minTime: number, maxTime: number, filterName: string }[],
        cabinClassOption: string[],
        ticketTypeOption: string[],
        priceRangeOption?: {min: number, max: number}
    }
}

const initialState: FlightsFilters = {
    filterOption: {
        airlineOption: [],
        flightTimeOption: [],
        cabinClassOption: [],
        ticketTypeOption: [],
    }
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
        }
    }
})

export const { setAirlineFilter, setFlightTimeFilter, setCabinClassFilter, setTicketTypeFilter, setPriceRangeFilter} = flightSlice.actions

export default flightSlice.reducer;