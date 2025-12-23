import type { NextPage, GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccommodationSearchForm from "@/modules/accommodation/components/shared/AccommodationSearchForm";
import { addSomeDays, dateFormat } from "@/modules/shared/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FilterSearch from "@/modules/accommodation/components/accommodationsList/filters";
import AccommodationList from "@/modules/accommodation/components/accommodationsList/list/AccommodationList";
import { Accommodation, ServerAddress } from "@/enum/url";
import { FilterValues } from "@/modules/accommodation/types/FilterValues";

const ITEMS_PER_PAGE = 24;

const AccommodationPage: NextPage = () => {
  const router = useRouter();

  const notSharedFeatures =
    typeof router.query.notSharedFeatures === "string"
      ? router.query.notSharedFeatures.split(",")
      : Array.isArray(router.query.notSharedFeatures)
      ? router.query.notSharedFeatures
      : [];

  const handleCategoryChange = (categories: string[]) => {
    setFilterValues(prev => ({ ...prev, categories }));
    const newQuery = { ...router.query };
    if (categories.length) {
      newQuery.category = categories.join(",");
    } else {
      delete newQuery.category;
    }
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  const phrase = typeof router.query.phrase === "string" ? router.query.phrase : undefined;

  // 1. Extract slug (city) from URL after "accommodations"
  const segments = router.asPath.split("/");
  const accommodationsIndex = segments.findIndex((s) => s === "accommodations");
  const citySlug =
    !phrase && accommodationsIndex !== -1 && segments[accommodationsIndex + 1]
      ? decodeURIComponent(segments[accommodationsIndex + 1])
      : undefined;

  // 2. State for city object
  const [defaultDestination, setDefaultDestination] = useState<any>(undefined);
  const [destinationLoading, setDestinationLoading] = useState(false);

  // 3. Fetch city info by slug
  useEffect(() => {
    if (!citySlug) {
      setDefaultDestination(undefined);
      return;
    }
    setDestinationLoading(true);
    fetch(
      `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetBySlug}?Slug=${citySlug}`,
      {
        method: "GET",
        headers: {
          accept: "text/plain",
          apikey: process.env.PROJECT_SERVER_APIKEY,
          tenantId: process.env.PROJECT_SERVER_TENANTID,
          "accept-language": "fa-IR",
        } as HeadersInit,
      }
    )
      .then((res) => res.json())
      .then((data) => setDefaultDestination(data.result))
      .catch(() => setDefaultDestination(undefined))
      .finally(() => setDestinationLoading(false));
  }, [citySlug]);

  const getValue = (prefix: string) => {
    const seg = segments.find((s) => s.startsWith(prefix));
    if (!seg) return undefined;
    return seg.split("?")[0].replace(prefix, "");
  };

  const checkin = getValue("checkin-") || dateFormat(new Date());
  const checkout = getValue("checkout-") || dateFormat(addSomeDays(new Date(checkin)));

  const accommodationDefaultDates: [string, string] = [checkin, checkout];

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [filterValues, setFilterValues] = useState<FilterValues>({
    capacity: getValue("capacity-") ? Number(getValue("capacity-")) : null,
    bedroomCount: Number(getValue("bedroomCount-")) || 0, // Default to 0
    isInstant: router.query.isInstant === "true" || false,
    categories: router.query.category ? (router.query.category as string).split(",") : [],
    notSharedFeatures,
    pool: {
      exists: false,
      hasWarmWater: false,
      type: [],
    },
    textureType: router.query.textureType ? String(router.query.textureType).split(",") : [],
    featuresCategory: router.query.featuresCategory ? String(router.query.featuresCategory).split(",") : [],
    parking: [],
    ruleType: router.query.ruleType ? String(router.query.ruleType).split(",") : [],
  });

  const page = Number(router.query.page || 1);

  const fetchAccommodations = async (pageNumber: number) => {
    setLoading(true);

    try {
      // شروع با مقادیر پیش‌فرض
      const body: any = {
        bedroomCount: filterValues.bedroomCount,
        checkin,
        checkout,
        isInstant: filterValues.isInstant,
        // تبدیل category به آرایه
        category: Array.isArray(filterValues.categories)
          ? filterValues.categories
          : typeof filterValues.categories === "string"
          ? filterValues.categories.split(",")
          : [],
        capacity: filterValues.capacity ?? 1,
        notSharedFeatures: filterValues.notSharedFeatures || [],
        pool: filterValues.pool,
        textureType: filterValues.textureType || [],
        featuresCategory: filterValues.featuresCategory || [],
        parking: filterValues.parking,
        ruleType: filterValues.ruleType,
        maxResultCount: ITEMS_PER_PAGE,
        skipCount: (pageNumber - 1) * ITEMS_PER_PAGE,
      };

      // اضافه کردن همه پارامترهای کوئری به body به صورت داینامیک
      Object.entries(router.query).forEach(([key, value]) => {
        if (key === "page") return;
        if (key === "category") {
          body.category = Array.isArray(value)
            ? value
            : typeof value === "string"
            ? value.split(",")
            : [];
          return;
        }
        if (Array.isArray(value)) {
          body[key] = value;
        } else if (!isNaN(Number(value))) {
          body[key] = Number(value);
        } else {
          body[key] = value;
        }
      });

      // phrase و citySlug را مثل قبل مدیریت کنید
      if (phrase) {
        body.phrase = phrase;
        body.enitites = [];
      } else if (citySlug) {
        body.enitites = [citySlug];
      } else {
        body.enitites = [];
      }

      const response = await fetch(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Availability}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.PROJECT_SERVER_APIKEY,
            tenantId: process.env.PROJECT_SERVER_TENANTID,
            "accept-language": "fa-IR",
          } as HeadersInit,
          body: JSON.stringify(body),
        }
      );

      const json = await response.json();
      setItems(json.result || []);
      setTotal(json.result.totalRows || 0);
    } catch (e) {
      console.log("Accommodation fetch failed:", e);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const segments = router.asPath.split("/");
    const filteredSegments = segments.filter((s) => !s.startsWith("capacity-"));

    if (filterValues.capacity && filterValues.capacity > 1) {
        filteredSegments.push(`capacity-${filterValues.capacity}`);
    }

    const newUrl = filteredSegments.join("/");
    if (newUrl !== router.asPath) {
        router.replace(newUrl, undefined, { shallow: true });
    }
  }, [filterValues.capacity, router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchAccommodations(page);
  }, [router.asPath]);

  const handlePageChange = (p: number) => {
    const query = { ...router.query };
    if (p === 1) {
        delete query.page;
    } else {
        query.page = p.toString();
    }
    router.push({
        pathname: router.pathname,
        query,
    }, undefined, { shallow: true });
};

  return (
    <div className="max-w-container mx-auto px-5 py-4">
      <AccommodationSearchForm
        wrapperClassName="relative z-[2] mb-4"
        defaultDates={accommodationDefaultDates}
        defaultDestination={defaultDestination}
        defaultCapacity={filterValues.capacity ?? 1}
      />

      <FilterSearch filterValues={filterValues} setFilterValues={setFilterValues} onCategoryChange={handleCategoryChange} />

      <div className="flex flex-row gap-2 items-center mt-6">
        {destinationLoading || loading ? (
          <>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
          </>
        ) : (
          <>
            <h1 className="font-bold">
              {/* اجاره ویلا و سوئیت در {defaultDestination ? defaultDestination.title : "همه نقاط"} */}
              {phrase ? "جستجوی عبارت " + phrase : defaultDestination ? "اجاره ویلا و سوئیت در" + defaultDestination.title : "همه نقاط"}

            </h1>
            <div>({total} اقامتگاه)</div>
          </>
        )}
      </div>

      <AccommodationList
        items={items} // should be array or { hotels: array }
        totalItems={total} // should be totalCount from API
        currentPage={page} // should be 1-based
        loading={loading}
        onPageChange={handlePageChange}
        checkin={checkin}
        checkout={checkout}
        capacity={filterValues.capacity ?? 1}
      />
    </div>
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

export default AccommodationPage;
