import Checkbox from "@/modules/shared/components/ui/Checkbox";
import { FlightType } from "../../types/flights";
import Image from "next/image";

type uniqAirlinesType = {
    airlineName: string;
    price: number;
    capacity: number;
    Picture: string;
    PictureAlt: string;
}

const FlightSidebarAirlines: React.FC<any> = ({ FlightsData }: { FlightsData: FlightType[] }) => {
    

    const uniq : uniqAirlinesType[] = [];
    FlightsData?.map((item: any) => {
        if (!uniq.find((i : any) => i.airlineName == item.airline?.name)) {
            uniq.push(
                {
                airlineName: item.airline?.name,
                price: item.adultPrice,
                capacity: item.capacity,
                Picture: item.airline?.picture?.path,
                PictureAlt: item.airline?.picture?.altAttribute
                }
            )
        }
        else if (uniq.find((i: any) => i.airlineName == item.airline?.name && i.price > item.adultPrice && i.capacity < item.capacity)) {
            uniq.splice(uniq.findIndex(e => e.airlineName == item.airline.name), 1)
            uniq.push(
                {
                    airlineName: item.airline?.name,
                    price: item.adultPrice,
                    capacity: item.capacity,
                    Picture: item.airline?.picture?.path,
                    PictureAlt: item.airline?.picture?.altAttribute
                }
                )
        }
    })

    return (
            <div className="pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">ایرلاین ها</h5>
                    {
                        uniq.map(flight => 
                            <Checkbox
                            label={
                               (<div className="flex w-full justify-between">
                                <div className="flex gap-1">
                                    <Image
                                        src={flight.Picture || ""}
                                        alt={flight.PictureAlt || ""}
                                        height={30} width={30} className={`w-6 h-6`}/>
                                        <p className="text-xs">{flight.airlineName}</p>
                                    </div>
                                    {
                                        flight.capacity ? 
                                            <p className="text-2xs text-left font-semibold">از {flight.price} ریال</p> :
                                            <p className="text-2xs text-left font-semibold text-gray-500">ظرفیت تکمیل است</p>
                                    }
                                </div>
                                )}
                                onChange={(c : any) => null}
                                value=""
                            />  
                        ) 
                    }
        </div>
    )
}

export default FlightSidebarAirlines;