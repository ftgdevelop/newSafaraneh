import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ServerAddress, Accommodation } from "@/enum/url";
import AccommodationName from "@/modules/accommodation/components/accommodationDetails/AccommodationName";
import Gallery from "@/modules/accommodation/components/accommodationDetails/Gallery";
import BackToList from "@/modules/accommodation/components/accommodationDetails/BackToList";
import Review from "@/modules/accommodation/components/accommodationDetails/Review";
import Similar from "@/modules/accommodation/components/accommodationDetails/Similar";
import Host from "@/modules/accommodation/components/accommodationDetails/Host";
import Spaces from "@/modules/accommodation/components/accommodationDetails/spaces";
import About from "@/modules/accommodation/components/accommodationDetails/About";
import Features from "@/modules/accommodation/components/accommodationDetails/Features";
import Distances from "@/modules/accommodation/components/accommodationDetails/Distances";
import Rules from "@/modules/accommodation/components/accommodationDetails/Rules";
import Rates from "@/modules/accommodation/components/accommodationDetails/rates";
import AnchorTabs from "@/modules/shared/components/ui/AnchorTabs";

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

  // Fetch accommodation details
  useEffect(() => {
    if (!id) return;

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

  const anchorItems = [
    { id: "spaces", title: "مشخصات کلی" },
    { id: "about", title: "درباره اقامتگاه" },
    { id: "features", title: "ویژگی‌ها" },
    { id: "distances", title: "فاصله‌ها" },
    { id: "rules", title: "قوانین اقامتگاه" },
    { id: "rates", title: "امتیاز و نظرات کاربران" },
    { id: "similar", title: "اقامتگاه‌های مشابه" },
  ];

  return (
    <div className="max-w-container mx-auto px-5 py-4">

      {/* Loading State */}
      {loading && <div className="text-gray-400">در حال بارگذاری...</div>}

      {/* Back to List */}
      <div className="mt-4 mb-6">
        <BackToList cityName="تهران" url="/#" />
      </div>

      {/* Accommodation Details */}
      {!loading && house ? (
        <>
            <Gallery images={house.pictures?.records || []} />

            {/* AnchorTabs */}
            <AnchorTabs items={anchorItems} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                
                <AccommodationName
                  title={house.title}
                  location={house.location}
                  rank={house.rank}
                  reviews={house.reviews}
                />

                <Host host={house.host} />
                
                <div id="spaces">
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

                <div id="rates">
                  <Rates rates={house.rates} />
                </div>

                {id && <Review id={id} />}

                <div id="similar">
                  {id && (
                    <Similar
                      id={id}
                      checkin={checkin}
                      checkout={checkout}
                      capacity={capacity}
                    />
                  )}
                </div>
              </div>
              <aside className="lg:col-span-1 bg-white p-4 border rounded-xl mt-8 sticky top-8">
                مبلغ قابل پرداخت: {house.salePrice?.toLocaleString("fa-IR")} تومان
              </aside>
            </div>
        </>
      ) : (
        !loading && <div className="text-red-500">اقامتگاه پیدا نشد.</div>
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
