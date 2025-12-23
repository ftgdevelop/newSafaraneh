import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState, useMemo } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ServerAddress, Accommodation } from "@/enum/url";

import AccommodationName from "@/modules/accommodation/components/accommodationDetails/Section/AccommodationName";
import Gallery from "@/modules/accommodation/components/accommodationDetails/Section/Gallery";
import BackToList from "@/modules/accommodation/components/accommodationDetails/Section/BackToList";
import Review from "@/modules/accommodation/components/accommodationDetails/Section/Review";
import Similar from "@/modules/accommodation/components/accommodationDetails/Section/Similar";
import Host from "@/modules/accommodation/components/accommodationDetails/Section/Host";
import Spaces from "@/modules/accommodation/components/accommodationDetails/Section/Spaces";
import About from "@/modules/accommodation/components/accommodationDetails/Section/About";
import Features from "@/modules/accommodation/components/accommodationDetails/Section/Features";
import Distances from "@/modules/accommodation/components/accommodationDetails/Section/Distances";
import Rules from "@/modules/accommodation/components/accommodationDetails/Section/Rules";
import Rates from "@/modules/accommodation/components/accommodationDetails/Section/Rates";
import AnchorTabs from "@/modules/shared/components/ui/AnchorTabs";
import Calendar from "@/modules/accommodation/components/accommodationDetails/Aside/Calendar";
import CalendarPicker from "@/modules/accommodation/components/accommodationDetails/Section/CalendarPicker";
import Button from "@/modules/shared/components/ui/Button";
import SectionTabs from "@/modules/shared/components/ui/SectionTabs";
import { Instant } from "@/modules/shared/components/ui/icons";

const AccommodationDetailPage: NextPage = () => {
  const router = useRouter();
  const { accommodationDetail = [] } = router.query;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const id = useMemo(() => {
    if (Array.isArray(accommodationDetail) && accommodationDetail[0]) {
      const parsed = Number(accommodationDetail[0]);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }, [accommodationDetail]);

  const checkin = Array.isArray(accommodationDetail)
    ? accommodationDetail[1]?.replace("checkin-", "")
    : undefined;

  const checkout = Array.isArray(accommodationDetail)
    ? accommodationDetail[2]?.replace("checkout-", "")
    : undefined;

  const capacity = Array.isArray(accommodationDetail)
    ? Number(accommodationDetail[3]?.replace("capacity-", "")) || 1
    : 1;

  const today = new Date();
  const defaultCheckin = checkin || today.toISOString().split("T")[0];
  const defaultCheckout =
    checkout ||
    new Date(today.setDate(today.getDate() + 30))
      .toISOString()
      .split("T")[0];

  const [checkinState, setCheckin] = useState(defaultCheckin);
  const [checkoutState, setCheckout] = useState(defaultCheckout);
  const [capacityState, setCapacity] = useState(capacity);

  useEffect(() => {
    if (id === null) return;

    const fetchAccommodationDetails = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetHouse}?Id=${id}`,
          {
            method: "GET",
            headers: {
              accept: "text/plain",
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
            } as HeadersInit,
          }
        );

        const data = await response.json();
        setHouse(data.result || null);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
        setHouse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  const handleUpdate = (newCheckin: string, newCheckout: string, newCapacity: number) => {
    if (id === null) return;

    setCheckin(newCheckin);
    setCheckout(newCheckout);
    setCapacity(newCapacity);

    router.push(
      {
        pathname: router.pathname,
        query: {
          accommodationDetail: [
            id.toString(),
            `checkin-${newCheckin}`,
            `checkout-${newCheckout}`,
            `capacity-${newCapacity}`,
          ],
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className="max-w-container mx-auto px-5 pb-4">
        {house && (
          <AccommodationName
            title={house.title}
            location={house.location}
            rank={house.rates.rank}
            reviews={house.reviews}
            isInstant={house.isInstant}
          />
        )}
        <div id="gallery" className="pt-4">
          <Gallery images={house?.pictures?.records || []} />
        </div>
      </div>
      <div className="max-w-container mx-auto px-3 pb-4 mt-4">

        {/* <div className="mt-4 mb-6">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block bg-gray-300 w-4 h-4 rounded-md"></div>
              <div className="hidden md:block bg-gray-300 w-24 h-4 rounded-md"></div>
            </div>
          ) : (
            <BackToList cityName="تهران" url="/#" />
          )}
        </div> */}

        {house && (
          <>
            <SectionTabs
              items={[
                { id: "gallery", title: "گالری تصاویر" },
                { id: "spaces", title: "مشخصات کلی" },
                { id: "about", title: "درباره اقامتگاه" },
                { id: "features", title: "ویژگی‌ها" },
                { id: "distances", title: "فاصله‌ها" },
                { id: "rules", title: "قوانین اقامتگاه" },
                { id: "calendar", title: "قیمتی تقویم" },
                { id: "rates", title: "نظرات کاربران" },
                { id: "similar", title: "اقامتگاه‌های مشابه" },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-screen">
              <div className="lg:col-span-4">

                <div id="spaces" className="mt-8">
                  <Host host={house.host} />

                  <Spaces spaces={house.spaces} />
                </div>

                <div id="about">
                  <About about={house.about} />
                </div>

                <div id="features">
                  <Features
                    features={house.features || { emptyCategories: [], filledCategories: {} }}
                  />
                </div>

                <div id="distances">
                  <Distances distances={house.distances || { records: [] }} />
                </div>

                <div id="rules">
                  <Rules rules={house.rules?.records} />
                </div>

                <div id="calendar">
                  {id !== null && (
                    <CalendarPicker
                      id={id}
                      checkin={checkinState}
                      checkout={checkoutState}
                    />
                  )}
                </div>

                <div id="rates">
                  <Rates rates={house.rates} />
                  {id !== null && <Review id={id} />}
                </div>

                <div id="similar">
                  {id !== null && (
                    <Similar
                      id={id}
                      checkin={checkinState}
                      checkout={checkoutState}
                      capacity={capacityState}
                    />
                  )}
                </div>

              </div>
              <aside className="lg:col-span-2 md:mt-8">
                <div className="sticky md:top-18">
                  {id !== null && (
                    <>
                      <Calendar
                        id={id}
                        checkin={checkinState}
                        checkout={checkoutState}
                        capacity={capacityState}
                        bookingToken={house.bookingToken}
                        onUpdate={handleUpdate}
                      />
                    </>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}

        {!house && !loading && (
          <div className="text-center py-20 text-gray-500">
            اقامتگاهی یافت نشد.
          </div>
        )}

      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  if (!process.env.PROJECT_MODULES?.includes("Accommodation")) {
    return { notFound: true };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
    },
  };
};
export default AccommodationDetailPage;
