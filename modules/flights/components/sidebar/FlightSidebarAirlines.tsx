import Checkbox from "@/modules/shared/components/ui/Checkbox";
import { FlightType } from "../../types/flights";
import Image from "next/image";


const FlightSidebarAirlines: React.FC<any> = ({ FlightsData }: { FlightsData: FlightType[] }) => {
    

    const uniq : any = [];
    FlightsData.map(item => {
        if (!uniq.includes(item.airline?.name)) {
            uniq.push(item.airline?.name)
        }
    })

    console.log(uniq);
    
    return (
            <div className="pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">ایرلاین ها</h5>
                    {
                        FlightsData.map(flight => 
                            <Checkbox
                            label={
                               (<div className="flex w-full justify-between">
                                <div className="flex gap-1">
                                    <Image
                                        src={flight.airline?.picture?.path || ""}
                                        alt={flight.airline?.picture?.altAttribute || ""}
                                        height={30} width={30} className={`w-6 h-6`}/>
                                        <p className="text-xs">{flight.airline?.name}</p>
                                    </div>
                                    {
                                        flight.capacity ? 
                                            <p className="text-2xs text-left font-semibold">از {flight.adultPrice} ریال</p> :
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