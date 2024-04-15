import { createSlice } from "@reduxjs/toolkit";

type FlightsFilters = {
    filterOption: {
        airlineOption: string[],
        flightTimeOption: { minTime: number, maxTime: number, filterName: string }[],
        cabinClassOption: string[],
        ticketTypeOption: string[],
        priceRangeOption?: {min: number, max: number}
    }
    SearchChangeOn: boolean;
    SearchData?: {
        destination: any,
        origin: any,
        adult: any,
        child: any,
        infant: any,
        depatrting: any,
        returning?: any,
        flightType?:'Bussines'| 'Economy'| 'All',
        BackForth: boolean
    }
}

const initialState: FlightsFilters = {
    filterOption: {
        airlineOption: [],
        flightTimeOption: [],
        cabinClassOption: [],
        ticketTypeOption: [],
    },
    SearchChangeOn: false,
    SearchData: {
        origin: null,
        destination: null,
        adult: 1,
        child: 0,
        infant: 0,
        depatrting: null,
        returning: null,
        flightType: 'All',
        BackForth: false
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
        },
        setSearchChangeOn: (state, action) => {
            state.SearchChangeOn = action.payload
        },
        setSearchData: (state, action) => {
            state.SearchData = action.payload
        }
    }
})

export const { setAirlineFilter, setFlightTimeFilter, setCabinClassFilter,
setTicketTypeFilter, setPriceRangeFilter, setSearchChangeOn, setSearchData } = flightSlice.actions

export default flightSlice.reducer;