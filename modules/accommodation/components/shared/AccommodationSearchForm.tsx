import { useTranslation, i18n } from "next-i18next";
import { ReactNode, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { ServerAddress, Accommodation, HeaderAccommodation } from "../../../../enum/url";
import AutoComplete from "../../../shared/components/ui/AutoComplete";
import { ApartmentOutline, Home2, Loading, Location, SearchTheme3, Village } from "../../../shared/components/ui/icons";
import { EntitySearchResultItemType, AccommodationRecentSearchItem } from "@/modules/accommodation/types/accommodation";
import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setReduxError } from "@/modules/shared/store/errorSlice";
import RangePicker from "../../../shared/components/ui/RangePicker";
import { localeFa } from "@mobiscroll/react";
import Button from "../../../shared/components/ui/Button";
import SelectPassengers from "./SelectPassengers";
import Link from "next/link";

const autoCompleteUrl = `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetEntity}`;

type Props = {
    defaultDestination?: EntitySearchResultItemType;
    defaultDates?: [string, string];
    defaultCapacity?: number;
    wrapperClassName?: string;
    labelsWhite?: boolean; // Added missing property
};

const AccommodationSearchForm: React.FC<Props> = (props) => {
    const { t } = useTranslation("common");

    const theme3 = process.env.THEME === "THEME3";

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [dates, setDates] = useState<[string, string] | undefined>(props.defaultDates);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [defaultDestinations, setDefaultDestinations] = useState<EntitySearchResultItemType[] | undefined>();
    const [selectedDestination, setSelectedDestination] = useState<EntitySearchResultItemType | undefined>(props.defaultDestination); // Fixed initialization

    useEffect(() => {
        setSubmitLoading(false);
    }, [router.asPath]);
    
    useEffect(() => {
        setSelectedDestination(props.defaultDestination);
    }, [props.defaultDestination]);

    const dateChangeHandle = (event: any) => {
        if (event.value[0] && event.value[1]) {
            setDates(event.value);
        }
    };

    const [passengerValues, setPassengerValues] = useState({
        adult: props.defaultCapacity || 1,
    });

    useEffect(() => {
        if (props.defaultCapacity) {
            setPassengerValues({ adult: props.defaultCapacity });
        }
    }, [props.defaultCapacity]);

    const setFieldValue = (field: string, value: any) => {
        setPassengerValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        if (!selectedDestination) {
            const localStorageDefaultDestinations = localStorage?.getItem("accommodationSearchDefaultDestinations");
            const initialDestinations = localStorageDefaultDestinations ? JSON.parse(localStorageDefaultDestinations) : undefined;

            if (initialDestinations) {
                setDefaultDestinations(initialDestinations);
            } else {
                const acceptLanguage = i18n && i18n.language === "en" ? "en-US" : "fa-IR";

                const fetchDefaultDestinations = async () => {
                    try {
                        const response = await axios({
                            method: "get",
                            url: autoCompleteUrl,
                            headers: {
                                ...HeaderAccommodation,
                                apikey: process.env.PROJECT_ACCOMMODATION_APIKEY,
                                tenantId: 7,
                                "Accept-Language": acceptLanguage || "fa-IR",
                            },
                        });

                        if (response?.data?.result?.items?.length) {
                            setDefaultDestinations(response.data.result.items);
                            localStorage?.setItem("accommodationSearchDefaultDestinations", JSON.stringify(response.data.result.items));
                        }
                    } catch (error: any) {
                        if (error.message) {
                            dispatch(
                                setReduxError({
                                    title: t("error"),
                                    message: error.message,
                                    isVisible: true,
                                })
                            );
                        }
                    }
                };
                fetchDefaultDestinations();
            }
        }
    }, [i18n?.language]);

    const renderOption = useCallback(
        (option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
            <div
                className={`px-3 py-2 flex gap-3 hover:bg-blue-50 items-center ${
                    !direction ? "" : direction === "rtl" ? "rtl" : "ltr"
                }`}
            >

                {option?.type === "City" ? <Location className="w-5 h-5 fill-current" /> 
                    : option?.type === "Province" ? <Home2 className="w-5 h-5 fill-current" /> 
                    : <Village className="w-4 h-4 fill-current" />}

                <div className="leading-5 text-neutral-600">
                    <div className="text-xs font-bold">{option.name}</div>
                    <div className="text-3xs">{option.title}</div>
                </div>
            </div>
        ),
        []
    );

    const submitHandler = async () => {
        if (!dates || dates.length < 2) {
            // TODO validation message
            return;
        }

        if (!selectedDestination) {
            // اگر مقصد انتخاب نشده باشد، هدایت به صفحه جستجو با کلمه وارد شده
            const searchQuery = document.getElementById("destination")?.value || "";
            if (searchQuery) {
              router.push(`/accommodations/${encodeURIComponent(searchQuery)}`);
            }
            return;
        }

        setSubmitLoading(true);

        let url: string = "";

        switch (selectedDestination?.type) {
            case "City":
            case "Province":
            case "Village":
                url = `/accommodations/${selectedDestination.slug!.replace(/ /g, "-")}`;
                break;

            default:
                url = "";
        }

        if (!url) {
            dispatch(
                setReduxError({
                    title: t("error"),
                    message: "متاسفانه برای این مقصد اطلاعاتی یافت نشد!",
                    isVisible: true,
                })
            );
            return;
        }

        url += `/checkin-${dates[0]}/checkout-${dates[1]}/capacity-${passengerValues.adult}`;

        const localStorageRecentSearches = localStorage?.getItem("accommodationRecentSearches");
        const recentSearches: AccommodationRecentSearchItem[] = localStorageRecentSearches
            ? JSON.parse(localStorageRecentSearches)
            : [];

        const searchObject: AccommodationRecentSearchItem = {
            url: url,
            title: selectedDestination.title || selectedDestination.name || "",
            dates: dates,
        };

        if (!recentSearches.find((item) => item.url === searchObject.url)) {
            recentSearches.unshift(searchObject);

            const slicedArray = recentSearches.slice(0, 10);

            const updatedRecentSearches = JSON.stringify(slicedArray);
            localStorage?.setItem("accommodationRecentSearches", updatedRecentSearches);
        }

        router.push(url);
    };

    const { labelsWhite } = props;

    // const onChangeHandle = (value: EntitySearchResultItemType | undefined) => {
    //     if (!value && props.defaultDestination) {
    //         setSelectedDestination(props.defaultDestination);
    //     } else {
    //         setSelectedDestination(value);
    //     }
    // };

    const onChangeHandle = (value: EntitySearchResultItemType | undefined) => {
        if (!value && selectedDestination?.name) {
            // هدایت به صفحه جستجو با استفاده از مقدار وارد شده
            router.push(`/accommodations/${encodeURIComponent(selectedDestination.name)}`);
        } else {
            setSelectedDestination(value);
        }
    };

    let buttonInnerHtml : ReactNode = t('search');
    if(theme3){
        if(submitLoading){
            buttonInnerHtml = <Loading className="w-7 h-7 fill-white animate-spin" />;
        }else{
            buttonInnerHtml = <SearchTheme3 className="w-6 h-6 fill-white" />;
        }
    }

    return (
        <div
            className={`accommodation-search-form ${
                theme3 ? "flex flex-col sm:flex-row" : "grid grid-cols-1 md:grid-cols-7"
            } gap-2 ${props.wrapperClassName || ""}`}
        >
            <div
                className={`relative z-20 ${
                    theme3 ? "sm:grow xl:basis-7/12" : "col-span-1 md:col-span-2"
                }`}
            >
                {theme3 && (
                    <label htmlFor="destination" className={`text-sm ${labelsWhite ? "text-white" : ""}`}>
                        {t("searchAccommodationDestination")}
                    </label>
                )}
                <AutoComplete
                    type="accommodation"
                    defaultList={defaultDestinations}
                    inputId="destination"
                    noResultMessage= {t("NoResultsFound")}
                    createTextFromOptionsObject={(item: EntitySearchResultItemType) =>
                        item.title || item.name || ""
                    }
                    acceptLanguage="fa-IR"
                    renderOption={renderOption}
                    icon="location"
                    inputClassName={`w-full outline-none rounded-lg ${
                        theme3 ? "bg-neutral-200" : "border border-neutral-400 pt-4"
                    } h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={t("search-accommodation-or-city")}
                    min={2}
                    value={selectedDestination}
                    onChangeHandle={onChangeHandle}
                    url={autoCompleteUrl}
                />
            </div>

            <div
                className={`relative z-10 ${theme3 ? "flex sm:grow" : "col-span-1 md:col-span-3"}`}
            >
                <RangePicker value={dates} onChange={dateChangeHandle} rtl locale={localeFa} />
            </div>

            <div className="sm:grow xl:basis-2/12">
                <label className="leading-5 select-none pointer-events-none text-sm" htmlFor="passengers">
                    تعداد مسافران
                </label>
                <SelectPassengers
                    values={passengerValues}
                    setFieldValue={setFieldValue}
                    wrapperClassNames={`shrink-0 ${theme3 ? "" : "sm:col-span-2 lg:col-span-1 xl:col-span-2"}`}
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
    );
};

export default AccommodationSearchForm;