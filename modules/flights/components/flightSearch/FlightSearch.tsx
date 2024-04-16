import FlightSearchPassengers from "./FlightSearchPassengers";
import FlightSearchDirection from "./FlightSearchDirection";
import FlightSearchDate from "./FlightSearchDate";
import FlightDirectionType from "./FlightDirectionType";
import FlightSearchButton from "./FlightSearchButton";
import FlightSearchFlightType from "./FlightSearchFlightType";


const FlightSearch: React.FC<any> = ({className}: {className: string}) => {

    return (
        <div className={`${className ? className : ''}`}>
            <div className="flex justify-between max-sm:block items-baseline mt-4 relative z-20">
                <FlightDirectionType />
                <div className="flex content-center">
                    <FlightSearchPassengers/>
                    <FlightSearchFlightType />
                </div>
            </div>
            <div className="grid grid-cols-3 max-lg:block max-lg:space-y-3 gap-2 mt-4 relative z-10">
                <FlightSearchDirection className={'col-span-2'} />
                <FlightSearchDate />
            </div>
            <FlightSearchButton />
        </div>
    )
}

export default FlightSearch;