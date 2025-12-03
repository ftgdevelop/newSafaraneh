import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

const AccommodationDetailPage: NextPage = () => {
  const router = useRouter();
  const { accommodationDetail = [] } = router.query;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Extract values from the dynamic route
  const id = Array.isArray(accommodationDetail) && accommodationDetail[0] ? Number(accommodationDetail[0]) : null;
  const checkin = Array.isArray(accommodationDetail) && accommodationDetail[1]?.replace("checkin-", "") || undefined;
  const checkout = Array.isArray(accommodationDetail) && accommodationDetail[2]?.replace("checkout-", "") || undefined;
  const capacity = Array.isArray(accommodationDetail) && accommodationDetail[3]?.replace("capacity-", "") || undefined;

  const defaultCheckin = checkin ? checkin : new Date().toISOString().split("T")[0];
  const defaultCheckout = checkout ? checkout : new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0];

  const [checkinState, setCheckin] = useState(checkin || defaultCheckin);
  const [checkoutState, setCheckout] = useState(checkout || defaultCheckout);
  const [capacityState, setCapacity] = useState(capacity ? Number(capacity) : 1);

  // Fetch accommodation details
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
              tenantId: "7",
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
            },
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
    if (id === null) {
      console.error("ID is null");
      return;
    }

    // Update the state
    setCheckin(newCheckin);
    setCheckout(newCheckout);
    setCapacity(newCapacity);

    // Update the URL with the new query parameters
    router.push(
      {
        pathname: router.pathname,
        query: {
          accommodationDetail: [
            id,
            `checkin-${newCheckin}`,
            `checkout-${newCheckout}`,
            `capacity-${newCapacity}`,
          ],
        },
      },
      undefined,
      { shallow: true } // Use shallow routing to avoid a full page reload
    );
  };

  return (
    <div className="max-w-container mx-auto px-5 py-4">
      {/* Back to List */}
      <div className="mt-4 mb-6">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="hidden md:block bg-gray-300 w-4 h-4 rounded-md"></div>
            <div className="hidden md:block bg-gray-300 w-24 h-4 rounded-md"></div>
          </div>
        ) : (
          <BackToList cityName="تهران" url="/#" />
        )}
      </div>

      {house && (
        <>
          <div id="gallery">
            <Gallery images={house.pictures?.records || []} />
          </div>
          
          <AnchorTabs
            items={[
              { id: "gallery", title: "گالری تصاویر" },
              { id: "spaces", title: "مشخصات کلی" },
              { id: "about", title: "درباره اقامتگاه" },
              { id: "features", title: "ویژگی‌ها" },
              { id: "distances", title: "فاصله‌ها" },
              { id: "rules", title: "قوانین اقامتگاه" },
              { id: "calendar", title: "تقویم" },
              { id: "rates", title: "نظرات کاربران" },
              { id: "similar", title: "اقامتگاه‌های مشابه" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-screen">
            <div className="lg:col-span-3">
              
              <div id="spaces">
                <AccommodationName
                  title={house.title}
                  location={house.location}
                  rank={house.rank}
                  reviews={house.reviews}
                />

                <Host host={house.host} />

                <Spaces spaces={house.spaces} />
              </div>

              <div id="about">
                <About about={house.about} />
              </div>

              <div id="features">
                <Features features={house.features || { emptyCategories: [], filledCategories: {} }} />
              </div>

              <div id="distances">
                <Distances distances={house.distances || { records: [] }} />
              </div>

              <div id="rules">
                <Rules rules={house.rules.records} />
              </div>

              <div id="calendar">
                {house && id !== null && (
                  <CalendarPicker id={id} checkin={checkinState} checkout={checkoutState} />
                )}
              </div>

              <div id="rates">
                <Rates rates={house.rates} />
                {id !== null && <Review id={id} />}
              </div>

              <div id="similar">
                {id !== null && (
                  <Similar id={id} checkin={checkinState} checkout={checkoutState} capacity={capacityState} />
                )}
              </div>
            </div>

            <aside className="lg:col-span-2 md:mt-8">
              <div className="sticky md:top-18">
                {id !== null && (
                  <Calendar
                    id={id}
                    checkin={checkinState}
                    checkout={checkoutState}
                    capacity={capacityState}
                    onUpdate={handleUpdate}
                  />
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
  );
};

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
  },
});

export default AccommodationDetailPage;
