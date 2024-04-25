import { useDispatch } from "react-redux";
import { setSearchChangeOn } from "../store/flightsSlice";

const FlightNoFlightItem: React.FC = () => {
    const dispatch = useDispatch()
    return (
        <div className="text-center mt-10">
            <h3 className="font-semibold">در تاریخ انتخاب شده هیج پروازی در دسترس نیست</h3>
            <p className="text-sm">برای مشاهده پرواز ها تاریخ دیگری را انتخاب کنید</p>
            <button type="button" className="bg-blue-500 rounded-sm text-white p-2 py-1 text-sm mt-5"
            onClick={() => dispatch(setSearchChangeOn(true))}>
                تغییر جستجو
            </button>
        </div>
    )
}

export default FlightNoFlightItem;