import React, { useEffect, useState } from "react";
import axios from "axios";
import { ServerAddress, Accommodation, HeaderAccommodation } from "@/enum/url";
import FiltersByCategory from "./FiltersByCategory";
import FiltersByGuestCapacity from "./FiltersByGuestCapacity";
import FiltersByTagCategory from "./FiltersByTagCategory";
import FiltersModal from "./FiltersModal";
import FilterSearchSkeleton from "./FilterSearchSkeleton";
import Image from "next/image";
import { useRouter } from "next/router";
import { FilterValues } from "@/modules/accommodation/types/FilterValues";

type FilterSearchProps = {
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  onCategoryChange?: (categories: string[]) => void;
};

const featuresCategoryLabelsFa: Record<string, string> = {
  Main: "اصلی",
  HeatingSystem: "سیستم گرمایش",
  CoolingSystem: "سیستم سرمایش",
  Spaces: "فضاها",
  KitchenFacilities: "امکانات آشپزخانه",
  Amenities: "امکانات",
  Health_Facilities: "امکانات بهداشتی",
  SpecialFacilities: "امکانات ویژه",
  AccommodationServices: "خدمات اقامتگاه",
  SafetyFacilities: "امکانات ایمنی",
  CctvCamera: "دوربین مداربسته",
};


const FilterSearch: React.FC<FilterSearchProps> = ({ filterValues, setFilterValues, onCategoryChange }) => {
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSearchFilter = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.SearchFilter}`,
          {},
          { headers: { ...HeaderAccommodation, tenantId: 7, currency: "EUR" } }
        );
        if (response?.data?.result) setFilters(response.data.result);
        else setError("No data found");
      } catch {
        setError("Error fetching filters");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchFilter();
  }, []);

  if (loading) return <FilterSearchSkeleton />;
  if (error) return <div>{error}</div>;
  if (!filters) return null;

  // دسته‌بندی‌ها
  const categoryIcons: Record<string, JSX.Element> = {
    Apartment: <Image src="/images/accommodation/category/apartment.png" alt="Apartment" width={24} height={24} />,
    Boomgardi: <Image src="/images/accommodation/category/boomgardi.png" alt="Boomgardi" width={24} height={24} />,
    Classic: <Image src="/images/accommodation/category/classic.png" alt="Classic" width={24} height={24} />,
    Cottage: <Image src="/images/accommodation/category/cottage.png" alt="Cottage" width={24} height={24} />,
    Economic: <Image src="/images/accommodation/category/economic.png" alt="Economic" width={24} height={24} />,
    Omg: <Image src="/images/accommodation/category/omg.png" alt="Omg" width={24} height={24} />,
    Room: <Image src="/images/accommodation/category/room.png" alt="Room" width={24} height={24} />,
    SwissCottage: <Image src="/images/accommodation/category/swiss-cottage.png" alt="Swiss Cottage" width={24} height={24} />,
    Villa: <Image src="/images/accommodation/category/villa.png" alt="Villa" width={24} height={24} />,
  };

  const tagCategoryItems = Object.entries(filters.category.values).map(([key, label]) => ({
    value: key,
    label: label as string,
    icon: categoryIcons[key] ?? null,
  }));

  const featuresCategoryItems = filters.featuresCategory
  ? (filters.featuresCategory.values as string[]).map((key) => ({
      value: key,
      label: featuresCategoryLabelsFa[key] || key,
    }))
  : [];


  return (
    <div>
      <div className="flex flex-row gap-2 mb-4">
        <FiltersByCategory
          items={tagCategoryItems}
          values={filterValues.categories}
          onChange={onCategoryChange ? onCategoryChange : (val) => setFilterValues(prev => ({ ...prev, categories: val }))}
        />

        <FiltersByGuestCapacity
          min={filters.guest.values.min}
          max={filters.guest.values.max}
          defaultValue={filterValues.capacity}
          onChange={(val) => setFilterValues(prev => ({ ...prev, capacity: val }))}
        />

        <button className="px-2 border rounded bg-white text-sm mb-2 font-bold" onClick={() => setIsFilterModalOpen(true)}>
          فیلترها
        </button>
      </div>

      <div className="border-y my-4">
        <FiltersByTagCategory
          items={tagCategoryItems}
          values={filterValues.categories}
          onChange={onCategoryChange ? onCategoryChange : (val) => setFilterValues(prev => ({ ...prev, categories: val }))}
        />
      </div>

      <FiltersModal
        show={isFilterModalOpen}
        setShow={setIsFilterModalOpen}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        maxBedrooms={filters.bedroomCount.values.max}
        notSharedFeaturesItems={filters.notSharedFeatures
          ? Object.entries(filters.notSharedFeatures.values).map(([key, label]) => ({ value: key, label: label as string }))
          : []
        }
        featuresCategoryItems={featuresCategoryItems}
        filters={filters}
      />
    </div>
  );
};

export default FilterSearch;
