import { Location, Travel } from "@/modules/shared/components/ui/icons";
import { useCallback, useState } from "react";
import AutoComplete from "@/modules/shared/components/ui/AutoComplete";
import { Flight, ServerAddress } from "@/enum/url";
import { defaultAirportOption } from "./defaultAirportOptios";
import { AirportSearchResponseItem } from "../../types/flights";

const FlightSearchDirection: React.FC = () => {
    const [selectedOrigin, setSelectedOrigin] = useState<AirportSearchResponseItem>();
    const [selectedDestination, setSelectedDestination] = useState<AirportSearchResponseItem>();

    const searchUrl = `${ServerAddress.Type}${Flight.searchFlights}`

    return (
        <>
            <div className="flex items-center gap-2 mt-5 w-full">
            <AutoComplete
                    defaultList={defaultAirportOption}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={'نتیجه ای پیدا نشد'}
                    createTextFromOptionsObject={(item:any) => item.city?.name + " - " + item.name}
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: AirportSearchResponseItem, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            {option.airportType == 'City' ? <Location className="w-4 fill-current"/>: <Travel className="fill-current w-3"/>}
                            <div className="leading-5">
                                <div className='text-xs'>{option.city.name}</div>
                                <div className='text-3xs'>{option.name}</div>
                            </div>
                            <span>{option.code}</span>
                        </div>
                    ), [])}
                    icon="location"
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={'مبدا پرواز'}
                    min={2}
                    value={selectedOrigin}
                    onChangeHandle={(e) => setSelectedOrigin(e)}
                    url={searchUrl}
                    type="flight"
            />
            
            <AutoComplete
                    defaultList={defaultAirportOption}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={'نتیجه ای پیدا نشد'}
                    createTextFromOptionsObject={(item:AirportSearchResponseItem) => item.city?.name + " - " + item.name}
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: AirportSearchResponseItem, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            {option.airportType == 'City' ? <Location className="w-4 fill-current"/>: <Travel className="fill-current w-3"/>}
                            <div className="leading-5">
                                <div className='text-xs'>{option.city.name}</div>
                                <div className='text-3xs'>{option.name}</div>
                            </div>
                            <span>{option.code}</span>
                        </div>
                    ), [])}
                    icon="location"
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={'مقصد پرواز'}
                    min={2}
                    value={selectedDestination}
                    onChangeHandle={(e) => setSelectedDestination(e)}
                    url={searchUrl}
                    type="flight"
                />

            </div>
        </>
    )
}

export default FlightSearchDirection;