import { useEffect, useState } from "react";
import { TravelerItem } from "../types/common";
import ModalPortal from "./ui/ModalPortal";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import { Close } from "./ui/icons";
import { openLoginForm } from "@/modules/authentication/store/authenticationSlice";
import Skeleton from "./ui/Skeleton";

type Props = {
    onSelectTraveler: (traveler:TravelerItem) => void;
    travelers?: TravelerItem[];
    fetchTravelers?: () => void;
    fetchingLoading?: boolean;
}

const FormerTravelers : React.FC<Props> = props => {

    const [open,setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const userIsAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    useEffect(()=>{

        if (props.fetchTravelers && open && !props.travelers && userIsAuthenticated){
            props.fetchTravelers();
        }
    },[open,userIsAuthenticated]);

    return(
        <>
        <button
            type="button"
            onClick={() => {
                setOpen(true);
                if (!userIsAuthenticated){
                    dispatch(openLoginForm())
                }
            }}
        >
        انتخاب مسافرین سابق
        </button>

        <ModalPortal
            show={open}
            selector='modal_portal_0'
        >
            <div className='fixed top-0 left-0 w-full h-full flex flex-col justify-center' >
                <div
                    className='bg-black/75 absolute top-0 left-0 w-full h-full z-[1]'
                    onClick={()=>{setOpen(false)}}
                />

                <div className="max-w-container mx-auto p-3 sm:p-5 w-full">

                    <div className='bg-white p-2 pt-14 sm:p-5 sm:rounded-lg relative z-[2]'>

                        <button type='button' onClick={()=>{setOpen(false)}} className='absolute top-2 left-2 z-30 lg:hidden' aria-label='close map'>
                            <Close className='w-10 h-10 fill-neutral-400' />
                        </button>

                        {props.fetchingLoading ? 
                        <Skeleton />
                        :
                        <div>
                            {props.travelers?.map(travelerItem => <div key={travelerItem.id}>
                                <h1>مسافر 1</h1>
                                {travelerItem.firstname}
                                <hr/>
                                {travelerItem.firstnamePersian}
                                </div>)}
                        </div>
                    }
                        
                    </div>
                </div>

            </div>

        </ModalPortal>
        </>
    )
} 

export default FormerTravelers;