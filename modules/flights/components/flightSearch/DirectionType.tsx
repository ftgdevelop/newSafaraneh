import { useRouter } from "next/router";

type Props = {
    hasReturn: boolean,
    setHasReturn: any
}
const DirectionType: React.FC<Props> = props => {
    const {hasReturn, setHasReturn} = props
    const router = useRouter()
    const DirectionTypeHandle = (type: string) => {
        if (type == 'BackForth') {
            setHasReturn(true)
        }
        else if (type == 'OneWay') {
            setHasReturn(false)
        }
    }
    
    return (
        <>
            <div className="flex">
                <button type="button"
                    className={`p-2 max-sm:p-1 ${!hasReturn ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('OneWay')}>
                    یک طرفه
                </button>
                <button type="button"
                    className={`p-2 max-sm:p-1 ${hasReturn ? 'text-blue-800 bg-blue-50' : 'text-gray-400 '} rounded-xl text-sm max-sm:text-xs cursor-pointer m-1`}
                onClick={() => DirectionTypeHandle('BackForth')}>
                    رفت و برگشت
                </button>
            </div>
        </>
    )
}

export default DirectionType;