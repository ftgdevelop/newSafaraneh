import { useState } from "react";
import { TravelerItem } from "../types/common";
import ModalPortal from "./ui/ModalPortal";

type Props = {
    onSelectTraveler: (traveler:TravelerItem) => void;
    travelers: TravelerItem[];
    fetchTravelers: () => void;
    fetchingLoading: boolean;
}

const FormerTravelers : React.FC<Props> = props => {

    const [open,setOpen] = useState<boolean>(false);

    return(
        <>
        <button
            type="button"
            onClick={() => {setOpen(true)}}
        >
        انتخاب مسافرین سابق
        </button>

        <ModalPortal
            show={open}
            selector='modal_portal'
        >
            <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">

                <div className="bg-white max-sm:mx-3 rounded-xl px-5 py-14 w-full max-w-md text-center">
                    hjhjkhjkhk
                </div>

            </div>

        </ModalPortal>
        </>
    )
} 

export default FormerTravelers;