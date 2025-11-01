import ReserveListItem from '@/modules/authentication/components/reservesList/ReserveListItem';
import ReserveListSearchForm from '@/modules/authentication/components/reservesList/ReserveListSearchForm';
import { shabGetReservedHotel } from '@/modules/shab/actions';
import Pagination from '@/modules/shared/components/ui/Pagination';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { ErrorCircle } from '@/modules/shared/components/ui/icons';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setReduxError } from '@/modules/shared/store/errorSlice';
//import { setReduxError } from '@/modules/shared/store/errorSlice';
import { ReserveType, UserReserveListItem } from '@/modules/shared/types/common';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ShabHotelReserveList: NextPage = () => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const [reserveList, setReserveList] = useState<UserReserveListItem[]>([]);
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const [ids, setIds] = useState<number>();
    const [types, setTypes] = useState<ReserveType>();

    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();

    type SearchParametesType = {
        SkipCount?: number;
        MaxResultCount?: number;
        Statue?: string;
        Types?: ReserveType;
        FromReturnTime?: string;
        ToReturnTime?: string;
        Ids?: number;
    }

    // const fetchReserves = async (params: SearchParametesType) => {

    //     const token = localStorage.getItem('Token');
    //     if (!token) {
    //         router.push("/")
    //     }
    //     setLoading(true);
    //     const response: any = await getUserAllReserves(params, token!);

    //     if (response?.data?.result) {
    //         setTotal(response.data.result.totalCount);
    //         setReserveList(response.data.result.items);

    //     } else {
    //         dispatch(setReduxError({
    //             title: t('error'),
    //             message: response?.response?.data?.error?.message || "خطا در ارسال درخواست!",
    //             isVisible: true
    //         }))
    //     }

    //     setLoading(false);
    // }


    useEffect(() => {

        const parameters: SearchParametesType = { MaxResultCount: 10, SkipCount: (page - 1) * 10 };

        if (ids) {
            parameters.Ids = +ids;
        }

        if (types) {
            parameters.Types = types;
        }

        if (startDate) {
            parameters.FromReturnTime = startDate;
        }

        if (endDate) {
            parameters.ToReturnTime = endDate;
        }

        //fetchReserves(parameters);

    }, [page, ids, types, startDate, endDate]);


    const searchSubmitHandle = (values: {
        SkipCount?: number;
        MaxResultCount?: number;
        Statue?: string;
        type?: string;
        FromReturnTime?: string;
        ToReturnTime?: string;
        reserveId?: string;
    }) => {

        setPage(1);

        if (values.reserveId) {
            setIds(+values.reserveId);
        } else {
            setIds(undefined);
        }

        if (values.type) {
            setTypes(values.type as ReserveType)
        } else {
            setTypes(undefined);
        }

        if (values.FromReturnTime) {
            setStartDate(values.FromReturnTime);
        } else {
            setStartDate(undefined);
        }

        if (values.ToReturnTime) {
            setEndDate(values.ToReturnTime);
        } else {
            setEndDate(undefined);
        }

    }

    const isShab = process.env.PROJECT === "SHAB";

    useEffect(() => {

        let shabTracerId = "";
        if (isShab) {
            const cookies = decodeURIComponent(document?.cookie).split(';');
            for (const item of cookies) {
                if (item.includes("shabTrackerId=")) {
                    shabTracerId = item.split("=")[1];
                }
            }
        }



        const fetchList = async (id: string) => {
            setLoading(true);
            const response: any = await shabGetReservedHotel({ 
                TrackerId: id ,
                MaxResultCount: "50",
                SkipCount:"0"
            });
            if (response.message) {
                dispatch(setReduxError({
                    title: tHotel('error'),
                    message: response.message,
                    isVisible: true
                }))
            }

            debugger;
            setLoading(false);
        }

        if (shabTracerId) {
            fetchList(shabTracerId);
        }

    }, []);

    return (
        <>
            <Head>
                <title> رزروهای من </title>
            </Head>
            <div className='max-w-container mx-auto p-3 sm:px-5 sm:py-4'>
                <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                    <div className='flex items-center gap-3 sm:gap-5 whitespace-nowrap p-3 sm:p-5 border-b border-neutral-300'>
                        <div className='text-lg'>
                            رزروهای من
                            <p className='text-xs mt-1'>
                                مدیریت و مشاهده رزروها
                            </p>
                        </div>
                    </div>

                    <div className='p-2 sm:p-5'>

                        {loading || reserveList.length ? (
                            <div>

                                <ReserveListSearchForm
                                    submitHandle={searchSubmitHandle}
                                />

                                <div className='border border-neutral-200 rounded-t bg-gray-50 grid grid-cols-6 text-xs mb-3 max-md:hidden'>
                                    <div className='p-2'> شماره سفارش </div>
                                    <div className='p-2'> نوع سفارش </div>
                                    <div className='p-2'> تاریخ </div>
                                    <div className='p-2'> مبلغ کل (ریال) </div>
                                    <div className='col-span-2 p-2'> وضعیت </div>
                                </div>

                                {!!(reserveList.length === 0 && loading) && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(loadingItem => (
                                    <div className='border border-neutral-200 rounded-t bg-gray-50 grid grid-cols-6 text-xs mb-3' key={loadingItem}>
                                        <div className='p-2'> <Skeleton /> </div>
                                        <div className='p-2'> <Skeleton /> </div>
                                        <div className='p-2'> <Skeleton /> </div>
                                        <div className='p-2'> <Skeleton /> </div>
                                        <div className='p-2'> <Skeleton /> </div>
                                        <div className='p-2'> <Skeleton /> </div>
                                    </div>
                                ))}

                                {reserveList.map(item => (
                                    <ReserveListItem key={item.id} item={item} />
                                ))}

                            </div>
                        ) : (
                            <div className='border border-neutral-300 bg-neutral-50 rounded my-5 flex items-center justify-center gap-3 p-5'>
                                <ErrorCircle className='w-6 h-6 fill-neutral-500' />
                                <strong className='font-demibold'>
                                    رزروی یافت نشد!
                                </strong>
                            </div>
                        )}

                        {!!(total && total > 10) && <Pagination
                            onChange={setPage}
                            totalItems={total}
                            currentPage={page}
                            wrapperClassName='mt-6'
                        />}

                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const isShab = process.env.PROJECT === "SHAB";

    if (!isShab) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            },
        }
    }

    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'payment']))
        },
    })
}

export default ShabHotelReserveList;