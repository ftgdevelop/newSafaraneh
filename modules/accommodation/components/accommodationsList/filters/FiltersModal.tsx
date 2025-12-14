import React, { useEffect, useState } from "react";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";
import FilterByIsInstant from "./FilterByIsInstant";
import FiltersByBedroomCount from "./FiltersByBedroomCount";
import FilterByNotSharedFeatures from "./FilterByNotSharedFeatures";
import FiltersByPool from "./FiltersByPool";
import FiltersByTextureType from "./FiltersByTextureType";
import FilterByFeaturesCategory from "./FilterByFeaturesCategory";
import FiltersByParking from "./FiltersByParking";
import { Close } from "@/modules/shared/components/ui/icons";
import { useRouter } from "next/router";
import { FilterValues } from "@/modules/accommodation/types/FilterValues";
import FiltersByRuleType from "./FiltersByRuleType";


const initialFilters: FilterValues = {
  capacity: 1,
  bedroomCount: 0,
  isInstant: false,
  categories: [],
  notSharedFeatures: [],
  pool: { exists: false, hasWarmWater: false, type: [] },
  textureType: [],
  featuresCategory: [],
  parking: [],
  ruleType: [],
};

type FiltersModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  maxBedrooms: number;
  notSharedFeaturesItems: { value: string; label: string }[];
  featuresCategoryItems: { value: string; label: string }[];
  filters: any;
};

const FiltersModal: React.FC<FiltersModalProps> = ({
  show,
  setShow,
  filterValues,
  setFilterValues,
  maxBedrooms,
  notSharedFeaturesItems,
  featuresCategoryItems,
  filters
}) => {
  const [tempFilters, setTempFilters] = useState<FilterValues>(filterValues);
  const router = useRouter();

  useEffect(() => {
    if (show) setTempFilters(filterValues);
  }, [show, filterValues]);

  const syncURL = (filters: FilterValues) => {
    const { accommodationsList, ...restQuery } = router.query;
    const newQuery: any = { ...restQuery };

    if (filters.categories.length) newQuery.category = filters.categories.join(",");
    else delete newQuery.category;

    if (filters.bedroomCount && filters.bedroomCount > 0) newQuery.bedroomCount = filters.bedroomCount;
    else delete newQuery.bedroomCount;

    if (filters.isInstant) newQuery.isInstant = "true";
    else delete newQuery.isInstant;

    if (filters.notSharedFeatures.length) newQuery.notSharedFeatures = filters.notSharedFeatures.join(",");
    else delete newQuery.notSharedFeatures;

    if (filters.pool.exists) newQuery.poolExists = "1";
    else delete newQuery.poolExists;

    if (filters.pool.hasWarmWater) newQuery.poolWarm = "1";
    else delete newQuery.poolWarm;

    if (filters.pool.type.length) newQuery.poolType = filters.pool.type.join(",");
    else delete newQuery.poolType;

    if (filters.textureType.length) newQuery.textureType = filters.textureType.join(",");
    else delete newQuery.textureType;

    if (filters.featuresCategory.length) newQuery.featuresCategory = filters.featuresCategory.join(",");
    else delete newQuery.featuresCategory;

    if (filters.parking.length) newQuery.parkingType = filters.parking.join(",");
    else delete newQuery.parkingType;

    if (filters.ruleType && filters.ruleType.length) newQuery.ruleType = filters.ruleType.join(",");
    else delete newQuery.ruleType;

    router.replace(
      { pathname: router.pathname, query: { accommodationsList, ...newQuery } },
      undefined,
      { shallow: true }
    );
  };

  const handleApply = () => {
    setFilterValues(tempFilters);
    syncURL(tempFilters);
    setShow(false);
  };

  const handleClear = () => {
    setTempFilters(initialFilters);
    setFilterValues(initialFilters);
    syncURL(initialFilters);
    setShow(false);
  };

  return (
    <ModalPortal selector="modal_portal" show={show}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="relative bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
          <button onClick={() => setShow(false)} className="absolute top-3 left-3 text-gray-500 hover:text-gray-700">
            <Close className="w-6 h-6" />
          </button>

          <h3 className="font-bold text-lg mb-4">فیلترها</h3>

          <div className="overflow-y-auto max-h-[320px] sm:max-h-[420px] pl-4">
            <hr className="mb-4" />
            <FilterByIsInstant
              checked={!!tempFilters.isInstant}
              onChange={val => setTempFilters(prev => ({ ...prev, isInstant: val }))}
            />
            <hr className="my-4" />
            <FiltersByBedroomCount
              min={0}
              max={maxBedrooms}
              value={tempFilters.bedroomCount ?? 0}
              onChange={val => setTempFilters(prev => ({ ...prev, bedroomCount: val }))}
            />
            <hr className="my-4" />
            <FilterByNotSharedFeatures
              values={tempFilters.notSharedFeatures}
              items={notSharedFeaturesItems}
              onChange={selected => setTempFilters(prev => ({ ...prev, notSharedFeatures: selected }))}
            />
            <hr className="mt-2 mb-4" />
            <FiltersByPool
              value={tempFilters.pool}
              onChange={val => setTempFilters(prev => ({ ...prev, pool: val }))}
            />
            <hr className="mt-2 mb-4" />
            <FiltersByTextureType
              values={tempFilters.textureType}
              items={[
                { value: "Urban", label: "شهری" },
                { value: "Rural", label: "روستایی" },
                { value: "Coastal", label: "ساحلی" },
                { value: "Forest", label: "جنگلی" },
                { value: "Desert", label: "کویری" },
                { value: "Mountain", label: "کوهستانی" },
              ]}
              onChange={(selected) => setTempFilters(prev => ({ ...prev, textureType: selected }))}
            />
            <hr className="mt-2 mb-4" />
            <FilterByFeaturesCategory
              values={tempFilters.featuresCategory}
              items={featuresCategoryItems}
              onChange={(selected) =>
                setTempFilters(prev => ({ ...prev, featuresCategory: selected }))
              }
            />
            <hr className="mt-2 mb-4" />
            <FiltersByParking
              values={tempFilters.parking}
              onChange={(val) => setTempFilters(prev => ({ ...prev, parking: val }))}
              types={filters.parking?.values.type.values.map((val: string) => ({
                value: val,
                label: val === "WithCeiling" ? "پارکینگ مسقف" : "پارکینگ روباز",
              })) || []}
            />
            <hr className="mt-2 mb-4" />
            <FiltersByRuleType
              values={tempFilters.ruleType}
              onChange={(val) => setTempFilters(prev => ({ ...prev, ruleType: val }))}
              types={[
                { value: "IdOnly", label: "فقط با کارت ملی" },
                { value: "CeremonyAllowed", label: "امکان برگزاری مراسم" },
                { value: "PetsAllowed", label: "امکان ورود حیوانات خانگی" },
                { value: "SingleGroup", label: "دربست" },
              ]}
            />
            <hr className="mt-2 mb-4" />
          </div>

          <div className="flex justify-between mt-6 gap-2">
            <button className="flex-1 py-2 rounded bg-gray-200" onClick={handleClear}>حذف فیلترها</button>
            <button className="flex-1 py-2 rounded bg-blue-600 text-white" onClick={handleApply}>اعمال فیلترها</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default FiltersModal;
