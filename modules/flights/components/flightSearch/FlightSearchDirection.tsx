import { Location, Swap, Travel } from "@/modules/shared/components/ui/icons";
import { useCallback, useEffect, useState } from "react";
import AutoComplete from "@/modules/shared/components/ui/AutoComplete";
import { Flight, ServerAddress } from "@/enum/url";
import { defaultAirportOption } from "./defaultAirportOptios";
import { AirportSearchResponseItem } from "../../types/flights";
import { SearchDataType } from "./FlightSearch";
import { useRouter } from "next/router";

const FlightSearchDirection: React.FC<any> = ({ className, SearchData, setSearchData, airports }: { className: string, SearchData:SearchDataType, setSearchData: any, airports: any }) => {
    const query = useRouter().query

    const [SelectedPoints, setSelectedPoints] = useState<[AirportSearchResponseItem | undefined, AirportSearchResponseItem | undefined]>([
        airports?.length ?
            {
                code: (airports[0].code as string),
                name: (airports[0]?.city.name as string),
                city: {
                    name: (airports[0]?.city.name as string),
                    code: airports[0]?.code
                },
                airportType: airports[0]?.airportType
                } : undefined,
        airports?.length ?
            {
                code: (airports[1].code as string),
                name: (airports[1].city.name as string),
                city: {
                    name: (airports[1]?.city.name as string),
                    code: airports[1]?.code
                },
                airportType: airports[1].airportType
            }:undefined
    ])
debugger
    useEffect(() => {
        setSearchData({ ...SearchData, origin: SelectedPoints[0]?.code, destination: SelectedPoints[1]?.code })
    }, [SelectedPoints])

    const searchUrl = `${ServerAddress.Type}${Flight.searchFlights}`

    const changeDirectionHandler = () => {
        setSelectedPoints(prev => [prev[1], prev[0]])
    }

    return (
        <div className={`grid grid-cols-2 gap-1 items-center relative ${className}`}>
            <AutoComplete
                    defaultList={defaultAirportOption}
                    inputId="origin"
                    //checkTypingLanguage
                    noResultMessage={'نتیجه ای پیدا نشد'}
                    createTextFromOptionsObject={(item:AirportSearchResponseItem | undefined) => item?.name + " - " + (item?.values?.name || item?.name)}
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: AirportSearchResponseItem | undefined, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center relative${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            {option?.airportType == 'City' ? <Location className="w-4 fill-current"/>: <Travel className="fill-current w-3"/>}
                            <div className="leading-5">
                                <p className='text-xs'>{option?.city.name || option?.name}</p>
                                <p className='text-3xs'>{option?.values?.name || option?.name}</p>
                            </div>
                            <span className="bg-gray-500 text-white rounded-sm pl-2 pr-2 text-2xs absolute left-4">{option?.code}</span>
                        </div>
                    ), [])}
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={'پرواز از'}
                    min={2}
                    value={SelectedPoints[0]}
                    onChangeHandle={(e: AirportSearchResponseItem|undefined) => setSelectedPoints(prev => [e,prev[1]])}
                    url={searchUrl}
                    type="flight"
            />
            
            <button 
                type="button" 
                className="bg-white z-30 rounded-full p-0.5 border-1 border-gray-600 absolute left-1/2 -translate-x-1/2"
                onClick={changeDirectionHandler}
            >
                <Swap className="w-5 h-5 fill-neutral-500" />
            </button>

            <AutoComplete
                    defaultList={defaultAirportOption}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={'نتیجه ای پیدا نشد'}
                    createTextFromOptionsObject={(item:AirportSearchResponseItem | undefined) => item?.name + " - " + (item?.values?.name || item?.name)}
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: AirportSearchResponseItem | undefined, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            {option?.airportType == 'City' ? <Location className="w-4 fill-current"/>: <Travel className="fill-current w-3"/>}
                            <div className="leading-5">
                                <p className='text-xs'>{option?.city.name || option?.name}</p>
                                <p className='text-3xs'>{option?.values?.name}</p>
                            </div>
                            <span className="bg-gray-500 text-white rounded-sm pl-2 pr-2 text-xs absolute left-4">{option?.code}</span>
                        </div>
                    ), [])}
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={'پرواز به'}
                    min={2}
                    value={SelectedPoints[1]}
                    onChangeHandle={(e: AirportSearchResponseItem|undefined) => setSelectedPoints(prev =>[prev[0],e])}
                    url={searchUrl}
                    type="flight"
                />
        </div>
    )
}

export default FlightSearchDirection;