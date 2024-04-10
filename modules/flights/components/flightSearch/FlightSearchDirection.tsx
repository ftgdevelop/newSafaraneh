import { Airpalne, ApartmentOutline, ArrowLeft, ArrowRight, Home2, Location } from "@/modules/shared/components/ui/icons";
import { useCallback, useState } from "react";
import AutoComplete from "@/modules/shared/components/ui/AutoComplete";
import { EntitySearchResultItemType } from "@/modules/domesticHotel/types/hotel";
import { Flight, ServerAddress } from "@/enum/url";
import { defaultAirportOption } from "./defaultAirportOptios";

const FlightSearchDirection: React.FC = () => {
    const [selectedOrigin, setSelectedOrigin] = useState<EntitySearchResultItemType>();
    const [selectedDestination, setSelectedDestination] = useState<EntitySearchResultItemType>();

    const searchUrl = `${ServerAddress.Type}${Flight.searchFlights}`

    const defaultList : EntitySearchResultItemType[] = defaultAirportOption.map((item, index) => {
        return ({
            name: item.value,
            type: 'City',
            displayName: item.label,
            id: index,
        })
    })

    return (
        <>
            <div className="flex items-center gap-2 mt-5 w-full">
            <AutoComplete
                    defaultList={defaultList}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={'NoResultsFound'}
                    textPropertyName='displayName'
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            <Airpalne className="fill-current w-8"/>
                            <div className="leading-5">
                                <div className='text-xs'>{option.name}</div>
                                <div className='text-3xs'>{option.displayName}</div>
                            </div>
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
                    defaultList={defaultList}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={'NoResultsFound'}
                    textPropertyName='displayName'
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                            <Airpalne className="fill-current w-8"/>
                            <div className="leading-5">
                                <div className='text-xs'>{option.name}</div>
                                <div className='text-3xs'>{option.displayName}</div>
                            </div>
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