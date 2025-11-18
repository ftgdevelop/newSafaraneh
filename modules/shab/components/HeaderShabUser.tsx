import { useTranslation } from "next-i18next";
import { useState, useEffect, useRef } from 'react';
import { User } from "../../shared/components/ui/icons";
import { getShabUser } from "../actions";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import Link from "next/link";

const HeaderShabUser = () => {

    const { t } = useTranslation('common');

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [userId, setUserId] = useState<string>("");

    const [userData, setUserData] = useState<{
        firstname?: string;
        lastname?: string;
        phoneNumber?: string;
    } | undefined>();

    const [userLoading, setUserLoading] = useState<boolean>(false);

    useEffect(() => {
        let cookies = decodeURIComponent(document?.cookie).split(';');
        for (const item of cookies) {
            if (item.includes("shabTrackerId=")) {
                setUserId(item.split("=")[1]);
            }
        }
    }, []);

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchUserData = async (id: string) => {
            setUserLoading(true);
            const response: any = await getShabUser({ reserveId: id });
            if (response?.data?.result) {
                setUserData(response.data.result)
            }
            setUserLoading(false);
        }
        if (userId) {
            fetchUserData(userId)
        }
    }, [userId]);

    const [open, setOpen] = useState<boolean>(false);

    if (!userLoading && !userData) {
        return null
    }

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => { setOpen(prevState => !prevState) }}
                type="button"
                aria-label={t('retrieve-my-booking')}
                className="flex gap-2 items-center text-sm bg-gray-400 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white self-center"
            >
                <User className="w-5 h-5 fill-current" />

                {userLoading ? (
                    <Skeleton className="w-24" />
                ) : `${userData!.firstname} ${userData!.lastname}`}

            </button>
            <div
                className={`absolute left-0 top-full min-w-full bg-[#eeeeee] flex gap-px flex-col shadow rounded-2xl transition-all duration-200 ${open ? "visible  opacity-100 mt-1" : "mt-3 invisible opacity-0"}`}
            >
                <Link href="/reserves/hotel" className="px-5 block text-sm py-1 bg-white hover:bg-blue-50 rounded-t-2xl" onClick={()=>{setOpen(false)}}>
                    لیست هتل
                </Link>
                <Link href="/reserves/flight" className="px-5 block text-sm py-1 bg-white hover:bg-blue-50 rounded-b-2xl" onClick={()=>{setOpen(false)}}>
                    لیست پرواز
                </Link>
            </div>
        </div>
    )
}

export default HeaderShabUser;