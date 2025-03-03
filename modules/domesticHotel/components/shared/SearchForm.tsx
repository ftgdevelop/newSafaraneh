import { useTranslation, i18n } from "next-i18next";
import { ReactNode, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

import { getDomesticHotelSummaryDetailById } from "@/modules/domesticHotel/actions";
import { Header, ServerAddress, Hotel } from "../../../../enum/url";
import AutoComplete from "../../../shared/components/ui/AutoComplete";
import { ApartmentOutline, Calendar, Home2, Loading, Location, Search, SearchTheme3 } from "../../../shared/components/ui/icons";
import { EntitySearchResultItemType, HotelRecentSearchItem } from "@/modules/domesticHotel/types/hotel";
import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setReduxError } from "@/modules/shared/store/errorSlice";
import RangePicker from "../../../shared/components/ui/RangePicker";
import { localeFa } from "@mobiscroll/react";
import Button from "../../../shared/components/ui/Button";
import AutoCompleteZoom from "@/modules/shared/components/ui/AutoCompleteZoom";



type Props = {
    defaultDestination?: EntitySearchResultItemType;
    defaultDates?: [string, string];
    wrapperClassName?: string;
}

const SearchForm: React.FC<Props> = props => {

    const { defaultDestination } = props;

    const { t } = useTranslation('common');
  
    const theme3 = process.env.THEME === "THEME3";

    const router = useRouter();
    const routerPath = router.asPath;

    const dispatch = useAppDispatch();

    const [dates, setDates] = useState<[string, string] | undefined>(props.defaultDates);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const dateChangeHandle = (event: any) => {

        if (event.value[0] && event.value[1]) {
            setDates(event.value)
        }
    }

    const [defaultDestinations, setDefaultDestinations] = useState<EntitySearchResultItemType[] | undefined>();

    const [selectedDestination, setSelectedDestination] = useState<EntitySearchResultItemType>();

    useEffect(() => {
        if (defaultDestination) {
            setSelectedDestination(defaultDestination);
        }
    }, [defaultDestination?.name]);

    useEffect(() => {
        setSubmitLoading(false);
    }, [routerPath]);

    const autoCompleteUrl = `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetEntity}`;

    useEffect(() => {

        if (!selectedDestination) {

            const localStorageDefaultDestinations = localStorage?.getItem('domesticHotelSearchDefaultDestinations');
            const initialDestinations = localStorageDefaultDestinations ? JSON.parse(localStorageDefaultDestinations) : undefined;

            if (initialDestinations) {

                setDefaultDestinations(initialDestinations);

            } else {
                const acceptLanguage = i18n && i18n.language === "en" ? "en-US" : "fa-IR";

                const fetchDefaultDestinations = async () => {
                    try {
                        const response = await axios({
                            method: "post",
                            url: autoCompleteUrl,
                            headers: {
                                ...Header,
                                apikey: process.env.PROJECT_PORTAL_APIKEY,
                                "Accept-Language": acceptLanguage || "fa-IR",
                            }
                        })

                        if (response?.data?.result?.length) {

                            setDefaultDestinations(response.data.result);
                            localStorage?.setItem('domesticHotelSearchDefaultDestinations', JSON.stringify(response.data.result));

                        }

                    } catch (error: any) {
                        if (error.message) {
                            dispatch(setReduxError({
                                title: t('error'),
                                message: error.message,
                                isVisible: true
                            }))
                        }

                    }
                }
                fetchDefaultDestinations();

            }
        }

    }, [i18n?.language]);

    const renderOption = useCallback((option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
        <div className={`px-3 py-2 flex gap-3 hover:bg-blue-50 items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
            {option.type === "Hotel" ? <ApartmentOutline className="w-5 h-5 fill-current" /> : option.type === "Province" ? <Home2 className="w-5 h-5 fill-current" /> : <Location className="w-5 h-5 fill-current" />}
            <div className="leading-5 text-neutral-600">
                <div className='text-xs font-bold'>{option.name}</div>
                <div className='text-3xs'>{option.displayName}</div>
            </div>
        </div>
    ), [])


    const submitHandler = async () => {
        if (!dates || dates.length < 2) {
            // TODO validation message
            return;
        }

        if (!selectedDestination) {
            // TODO validation message
            return;
        }

        setSubmitLoading(true);

        let url: string = "";

        const isSafarLife = process.env.SITE_NAME === 'https://www.safarlife.com';

        switch (selectedDestination.type) {
            case "City":
                if (isSafarLife && selectedDestination.slug){
                    url = selectedDestination.slug;
                }else if (i18n && i18n.language === "fa") {
                    url = `/hotels/هتل-های-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else if (i18n && i18n.language === "ar") {
                    url = `/hotels/فنادق-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else {
                    url = `/hotels/${selectedDestination.name!.replace(/ /g, "-")}`;
                }
                
                if(selectedDestination.id){
                    url += `/locationId-${selectedDestination.id}`;
                }
                
                break;

            case "Province":

                if (i18n && i18n.language === "fa") {
                    url = `/hotels/هتل-های-استان-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else if (i18n && i18n.language === "ar") {
                    url = `/hotels/فنادق-محافظة-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else {
                    url = `/hotels/${selectedDestination.name!.replace(/ /g, "-")}`;
                }

                if(selectedDestination.id){
                    url += `/locationId-${selectedDestination.id}`;
                }

                break;

            case "Hotel":
                const hotelDetailsResponse = await getDomesticHotelSummaryDetailById(selectedDestination.id!, i18n?.language === "en" ? "en-US" : "fa-IR");

                if (hotelDetailsResponse.data?.result) {
                    if(hotelDetailsResponse.data.result.url){
                        url = hotelDetailsResponse.data.result.url;
                    }
                } else {
                    let message = "";
                    if (hotelDetailsResponse.response) {
                        message = hotelDetailsResponse.response.statusText || hotelDetailsResponse.response.data.error?.message || t('oopsSomethingWentWrong1');
                    } else if (!hotelDetailsResponse.request) {
                        message = hotelDetailsResponse.message;
                    } else {
                        message = t('oopsSomethingWentWrong2')
                    }
                    dispatch(setReduxError({
                        title: t('error'),
                        message,
                        isVisible: true
                    }));
                    return;
                }

                break;

            default:
                url = "";
        }


        if(!url){
            dispatch(setReduxError({
                title: t('error'),
                message: "متاسفانه برای این مقصد اطلاعاتی یافت نشد!",
                isVisible: true
            }))
            return;
        }

        url += `/checkin-${dates[0]}/checkout-${dates[1]}`;

        const localStorageRecentSearches = localStorage?.getItem("hotelRecentSearches");
        const recentSearches: HotelRecentSearchItem[] = localStorageRecentSearches ? JSON.parse(localStorageRecentSearches) : [];

        const searchObject: HotelRecentSearchItem = {
            url: url,
            title: selectedDestination.displayName || selectedDestination.name || "",
            dates: dates,
        };

        if (!(recentSearches.find(item => item.url === searchObject.url))) {
            recentSearches.unshift(searchObject);

            const slicedArray = recentSearches.slice(0, 10);

            const updatedRecentSearches = JSON.stringify(slicedArray);
            localStorage?.setItem("hotelRecentSearches", updatedRecentSearches)
        }

        router.push(url);

    }



    //start sholud be removed when modern datepicker replaced with mobiscroll:
    // const [locale, setLocale] = useState<"fa" | "en">("fa");
    // const onChangeCheckin = (d: string) => {
    //     setDates(prevState => {
    //         if (!d) { return prevState; }
    //         const prevCheckout = prevState?.length ? prevState[1] : "";
    //         if (prevCheckout) {
    //             const isAfter = checkDateIsAfterDate(new Date(d), new Date(prevCheckout));
    //             if (isAfter) {
    //                 const firstAvailableCheckout = dateFormat(addSomeDays(new Date(d)));
    //                 return ([d, firstAvailableCheckout]);
    //             }
    //         }
    //         return ([d, prevCheckout])
    //     })
    // }
    // const onChangeCheckout = (d: string) => {
    //     setDates(prevState => {
    //         if (!d) { return prevState; }
    //         const prevCheckin = prevState?.length ? prevState[0] : "";
    //         return ([prevCheckin, d])
    //     })
    // }
    //end sholud be removed when modern datepicker replaced with mobiscroll:



    const theme2 = process.env.THEME === "THEME2";

    let buttonInnerHtml : ReactNode = t('search');
    if(theme3){
        if(submitLoading){
            buttonInnerHtml = <Loading className="w-7 h-7 fill-white animate-spin" />;
        }else{
            buttonInnerHtml = <SearchTheme3 className="w-6 h-6 fill-white" />;
        }
    }
    return (
        <div className={`domestic-hotel-search-form ${theme3?"flex flex-col sm:flex-row":"grid grid-cols-1 md:grid-cols-7"} gap-2 ${props.wrapperClassName || ""}`}>
            
            <div className={`relative z-20 ${theme3?"sm:grow xl:basis-7/12":"col-span-1 md:col-span-3"}`}>
                {theme2 ? (
                    <AutoCompleteZoom
                        defaultListLabel="محبوب ترین ها"
                        label={theme2 ? t('search-hotel-or-city') : "نام شهر، هتل یا منطقه"}
                        type="hotel"
                        defaultList={defaultDestinations}
                        inputId="destination"
                        //checkTypingLanguage
                        noResultMessage={t('NoResultsFound')}
                        createTextFromOptionsObject={(item: EntitySearchResultItemType) => item.displayName || item.name || ""}
                        acceptLanguage="fa-IR"
                        renderOption={renderOption}
                        icon="location"
                        inputClassName="w-full bg-white leading-5 border rounded-lg border-neutral-400 py-0.5 text-md h-12 flex flex-col justify-center"
                        placeholder={t('search-hotel-or-city')}
                        min={2}
                        value={selectedDestination}
                        onChangeHandle={setSelectedDestination}
                        url={autoCompleteUrl}
                    />
                ) : (
                    <>
                        <label htmlFor="destination" className={theme3?"text-sm":"absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5"}>
                            {t('searchHotelDestination')}
                        </label>
                        <AutoComplete
                            type="hotel"
                            defaultList={defaultDestinations}
                            inputId="destination"
                            //checkTypingLanguage
                            noResultMessage={t('NoResultsFound')}
                            createTextFromOptionsObject={(item: EntitySearchResultItemType) => item.displayName || item.name || ""}
                            acceptLanguage="fa-IR"
                            renderOption={renderOption}
                            icon="location"
                            inputClassName={`w-full outline-none rounded-lg ${theme3?"bg-neutral-200":"border border-neutral-400 pt-4"} h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                            placeholder={t('search-hotel-or-city')}
                            min={2}
                            value={selectedDestination}
                            onChangeHandle={setSelectedDestination}
                            url={autoCompleteUrl}
                        />
                    </>
                )}
            </div>

            <div className={`relative z-10 ${theme3?"flex sm:grow":"col-span-1 md:col-span-3"}`}>
                <RangePicker
                    value={dates}
                    onChange={dateChangeHandle}
                    rtl
                    locale={localeFa}
                />

            </div>

            <div className={`${theme3?"pt-4 sm:pt-7":"pt-5 md:pt-0"}`}>
                <Button
                    loading={theme3 ? false : submitLoading}
                    onClick={submitHandler}
                    color={theme3 ? "yellow" : undefined}
                    className={`h-12 block mx-auto ${theme3?"font-semibold w-full sm:w-12 flex items-center justify-center":"w-full sm:max-w-64"}`}
                >
                    {buttonInnerHtml}
                </Button>
            </div>
        </div>
    )
}

export default SearchForm;