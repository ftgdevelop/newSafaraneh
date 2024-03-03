import FlightTollbar from "@/modules/flights/FlightSidebar";
import FlightsMain from "@/modules/flights/FlightsMain";
import { NextPage } from "next";

const Flights: NextPage = () => {
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightTollbar />
            <FlightsMain />
        </div>
    )
}

export default Flights;