const FlightSearchPassengers: React.FC<any> = ({passengersOn}: {passengersOn: boolean}) => {
    return (
        <div className={`bg-white text-gray-600 w-72 p-3 pt-5 pb-5 ${passengersOn ? 'scale-100': 'scale-0'}
        absolute -bottom-40 left-8 max-sm:left-0 max-sm:right-1 space-y-5 rounded-sm duration-150 shadow-lg shadow-gray-600`}>
            <div className="flex text-sm justify-between">
                <p>بزرگسال (+12 سال)</p>
                <div className="flex">
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">+</button>
                        <span className="mr-2 ml-2">3</span>
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">-</button>
                </div>
            </div>
            <div className="flex text-sm justify-between">
                <p>بزرگسال (+12 سال)</p>
                <div className="flex">
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">+</button>
                        <span className="mr-2 ml-2">3</span>
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">-</button>
                </div>
            </div>
            <div className="flex text-sm justify-between">
                <p>بزرگسال (+12 سال)</p>
                <div className="flex">
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">+</button>
                        <span className="mr-2 ml-2">3</span>
                    <button type="button" className="bg-gray-200 rounded-full text-black w-fit pl-3 pr-3 h-fit">-</button>
                </div>
            </div>
        </div>
    )
}

export default FlightSearchPassengers;