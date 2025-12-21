import { useState, useEffect } from "react";
import { UpCaret, DownCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";

type Feature = {
  featureLabel: string;
  featureName: string;
  isActive: number;
  iconUrl: string;
};

type FeaturesProps = {
  features: {
    emptyCategories: string[];
    filledCategories: {
      [category: string]: Feature[];
    };
  };
};

function Features({ features }: FeaturesProps) {
  const { filledCategories } = features;
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="py-16 border-b">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="w-6 h-6 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!filledCategories || Object.keys(filledCategories).length === 0) {
    return (
      <div className="my-16 border-b pb-16">
        <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">ویژگی‌ها</h2>
        <p className="text-sm text-gray-600">هیچ ویژگی‌ای موجود نیست.</p>
      </div>
    );
  }

  const categories = Object.entries(filledCategories);
  const visibleCategories = showAll ? categories : categories.slice(0, 2);

  const toggleShowMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="py-16 border-b">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">ویژگی‌ها</h2>
      {visibleCategories.map(([category, features]) => (
        <CategoryFeatures key={category} category={category} features={features} />
      ))}
      {categories.length > 2 && (
        <button
          onClick={toggleShowMore}
          className="flex items-center gap-1 text-blue-500 text-sm mt-4 focus:outline-none bg-blue-50 px-3 py-1 rounded-full"
        >
          {showAll ? "نمایش کمتر" : "نمایش بیشتر"}
          {showAll ? (
            <UpCaret className="w-4 h-4 fill-blue-500" />
          ) : (
            <DownCaret className="w-4 h-4 fill-blue-500" />
          )}
        </button>
      )}
    </div>
  );
}

function CategoryFeatures({
  category,
  features,
}: {
  category: string;
  features: Feature[];
}) {
  return (
    <div className="mb-8">
      <h4 className="text-md font-bold text-gray-700 mb-2">
        {translateCategory(category)}
      </h4>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Image
              src={feature.iconUrl}
              alt={feature.featureLabel}
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-sm text-gray-600">{feature.featureLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function translateCategory(category: string): string {
  const translations: { [key: string]: string } = {
    kitchen_facilities: "امکانات آشپزخانه",
    spaces: "فضاها",
    amenities: "امکانات رفاهی",
    special_facilities: "امکانات ویژه",
    main: "امکانات اصلی",
    heating_system: "سیستم گرمایشی",
    cooling_system: "سیستم سرمایشی",
    safety_facilities: "امکانات ایمنی",
  };
  return translations[category] || category;
}

export default Features;