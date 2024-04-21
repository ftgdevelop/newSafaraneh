import { useEffect } from "react";
import { SearchDataType } from "./FlightSearch";
import { useRouter } from "next/router";

const FlightDirectionType: React.FC<any> = ({SearchData, setSearchData} : {SearchData: SearchDataType, setSearchData: any}) => {
    const router = useRouter()
    const DirectionTypeHandle = (type: string) => {
        if (type == 'BackForth') {
            setSearchData({ ...SearchData, BackForth: true })
        }
        else if (type == 'OneWay') {
            setSearchData({...SearchData, BackForth: false})
        }
    }
    
    return (
        <>
            <div className="flex">
                <button type="button"
                    className={`p-2 max-sm:p-1 ${!SearchData?.BackForth ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('OneWay')}>
                    یک طرفه
                </button>
                <button type="button"
                    className={`p-2 max-sm:p-1 ${SearchData?.BackForth ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('BackForth')}>
                    رفت و برگشت
                </button>
            </div>
        </>
    )
}

export default FlightDirectionType;