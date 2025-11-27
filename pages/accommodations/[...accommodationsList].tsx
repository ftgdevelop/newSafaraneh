import type { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccommodationSearchForm from "@/modules/accommodation/components/shared/AccommodationSearchForm";
import { addSomeDays, dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FilterSearch from "@/modules/accommodation/components/accommodationsList/filters";
import AccommodationList from "@/modules/accommodation/components/accommodationsList/list/AccommodationList";
import { Accommodation, ServerAddress } from "@/enum/url";

type FilterValues = {
  capacity: number | null;
  bedroomCount: number;
  isInstant: boolean;
  categories: string[];
  notSharedFeatures: string[];
  pool: {
    exists: boolean;
    hasWarmWater: boolean;
    type: string[];
  };
  textureType: string[];
};

const AccommodationPage: NextPage = () => {
  const router = useRouter();

  const notSharedFeatures =
  typeof router.query.notSharedFeatures === "string"
    ? router.query.notSharedFeatures.split(",")
    : Array.isArray(router.query.notSharedFeatures)
      ? router.query.notSharedFeatures
      : [];

  const segments = router.asPath.split("/");

  const getValue = (prefix: string) => {
    const seg = segments.find((s) => s.startsWith(prefix));
    if (!seg) return undefined;
    return seg.split("?")[0].replace(prefix, "");
  };

  const checkin = getValue("checkin-") || dateFormat(new Date());
  const checkout = getValue("checkout-") || dateFormat(addSomeDays(new Date(checkin)));

  const accommodationsIndex = segments.findIndex((s) => s === "accommodations");
  const destinationName = accommodationsIndex !== -1 && segments[accommodationsIndex + 1]
    ? decodeURIComponent(segments[accommodationsIndex + 1])
    : undefined;

  const defaultDestination = undefined;

  const accommodationDefaultDates: [string, string] = [checkin, checkout];

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    capacity: getValue("capacity-") ? Number(getValue("capacity-")) : null,
    bedroomCount: Number(getValue("bedroomCount-")) || 0,
    isInstant: router.query.isInstant === "true" || false,
    categories: router.query.category ? (router.query.category as string).split(",") : [] as string[],
    notSharedFeatures,
    pool: {
      exists: false,
      hasWarmWater: false,
      type: [] as string[],
    },
    textureType: router.query.textureType ? (router.query.textureType as string).split(",") : [] as string[],
  });

  const page = Number(router.query.page || 1);

  const fetchAccommodations = async (pageNumber: number) => {
    setLoading(true);

    try {
      const response = await fetch(`${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          tenantId: "7",
          "accept-language": "fa-IR",
        },
        body: JSON.stringify({
          bedroomCount: filterValues.bedroomCount,
          enitites: destinationName ? [destinationName] : [],
          checkin,
          checkout,
          isInstant: filterValues.isInstant,
          category: filterValues.categories,
          perpage: 8,
          page: pageNumber,
          capacity: filterValues.capacity ?? 1,
          notSharedFeatures: filterValues.notSharedFeatures || [],
          pool: filterValues.pool,
        }),
      });

      const json = await response.json();

      setItems(json.result || []);
      setTotal(json.total || 0);
    } catch (e) {
      console.log("Accommodation fetch failed:", e);
    }

    setLoading(false);
  };

  useEffect(() => {
      if (!router.isReady) return;

      const segments = router.asPath.split("/");

      const capacityIndex = segments.findIndex(s => s.startsWith("capacity-"));

      const newCapacitySegment = `capacity-${filterValues.capacity ?? 1}`;

      if (capacityIndex !== -1) {
        segments[capacityIndex] = newCapacitySegment;
      } else {
        segments.splice(segments.length - 1, 0, newCapacitySegment);
      }

      const newUrl = segments.join("/");

      router.replace(newUrl, undefined, { shallow: true });
    }, [filterValues.capacity, router.isReady]);

    useEffect(() => {
      if (!router.isReady) return;
      fetchAccommodations(page);
    }, [router.asPath]);


  const handlePageChange = (p: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query },
    });
  };

  return (
    <>
      <div className="max-w-container mx-auto px-5 py-4">
        <AccommodationSearchForm
          wrapperClassName="relative z-[2] mb-4"
          defaultDates={accommodationDefaultDates}
          defaultDestination={defaultDestination}
          defaultCapacity={filterValues.capacity ?? 1}
        />

        <FilterSearch 
          filterValues={filterValues} 
          setFilterValues={(v: any) => setFilterValues(v)} 
        />

        <AccommodationList
          items={items}
          totalItems={total}
          currentPage={page}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
    },
  };
};

export default AccommodationPage;
