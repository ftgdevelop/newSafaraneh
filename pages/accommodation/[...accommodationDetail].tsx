import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ServerAddress, Accommodation } from "@/enum/url"; // adjust path if needed
import AccommodationName from "@/modules/accommodation/components/accommodationDetails/AccommodationName";
import Gallery from "@/modules/accommodation/components/accommodationDetails/Gallery";
import BackToList from "@/modules/accommodation/components/accommodationDetails/BackToList";
import CancellationRules from "@/modules/accommodation/components/accommodationDetails/CancellationRules";
import Review from "@/modules/accommodation/components/accommodationDetails/Review";
import Similar from "@/modules/accommodation/components/accommodationDetails/Similar";

const AccommodationDetailPage: NextPage = () => {
  const router = useRouter();
  const { accommodationDetail = [] } = router.query;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Extract id from the dynamic route (normalize to number)
  const idStr =
    Array.isArray(accommodationDetail) && accommodationDetail.length > 0
      ? accommodationDetail[0]
      : null;
  const id: number | null = idStr ? Number(idStr) : null;

  const checkin = router.query.checkin as string;
  const checkout = router.query.checkout as string;
  const capacity = router.query.capacity as string;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(
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
    )
      .then((res) => res.json())
      .then((json) => setHouse(json.result || null))
      .catch(() => setHouse(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-container mx-auto px-5 py-4">
      <h1 className="text-2xl font-bold mb-6">جزئیات اقامتگاه</h1>
      {loading ? (
        <div className="text-gray-400">در حال بارگذاری...</div>
      ) : house ? (
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
          {JSON.stringify(house, null, 2)}
        </pre>
      ) : (
        <div className="text-red-500">اقامتگاه پیدا نشد.</div>
      )}

      <div className="mt-4 mb-6">
        <BackToList cityName="تهران" url="/#" />
      </div>

      <Gallery />
      <AccommodationName />

      {id !== null && <CancellationRules id={id} />}
      {id && <Review id={id} />}
      {id && <Similar id={id} checkin={checkin} checkout={checkout} capacity={capacity} />}
    </div>
  );
};

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
  },
});

export default AccommodationDetailPage;
