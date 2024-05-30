import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./errorSlice";
import notificationSlice from "./notificationSlice";
import domesticHotelSlice from "@/modules/domesticHotel/store/domesticHotelSlice";
import stylesSlice from "./stylesSlice";
import authenticationSlice from "@/modules/authentication/store/authenticationSlice";
import flightSlice from "@/modules/flights/store/flightsSlice";
import busSlice from "@/modules/bus/stroe/busSlice";

export const store = configureStore({
    reducer: {
        error: errorSlice,
        notification: notificationSlice,
        domesticHotelFilter: domesticHotelSlice,
        styles: stylesSlice,
        authentication: authenticationSlice,
        flightFilters: flightSlice,
        busFilters: busSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch