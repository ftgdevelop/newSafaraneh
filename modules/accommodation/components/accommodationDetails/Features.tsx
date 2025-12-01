import { useState } from "react";
import { UpCaret, DownCaret } from "@/modules/shared/components/ui/icons"; // Import the icons

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

  // Check if there are no filled categories
  if (!filledCategories || Object.keys(filledCategories).length === 0) {
    return (
      <div className="my-16 border-b pb-16">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ویژگی‌ها</h3>
        <p className="text-sm text-gray-600">هیچ ویژگی‌ای موجود نیست.</p>
      </div>
    );
  }

  const [showAll, setShowAll] = useState(false);
  const categories = Object.entries(filledCategories);
  const visibleCategories = showAll ? categories : categories.slice(0, 2);

  const toggleShowMore = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="py-16 border-b">
      <h3 className="text-lg font-bold text-gray-800 mb-4">ویژگی‌ها</h3>
      {visibleCategories.map(([category, features]) => (
        <CategoryFeatures key={category} category={category} features={features} />
      ))}
      {categories.length > 2 && (
        <button
          onClick={toggleShowMore}
          className="flex items-center gap-1 text-blue-500 text-sm mt-4 focus:outline-none"
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

// Component to handle each category and its features
function CategoryFeatures({
  category,
  features,
}: {
  category: string;
  features: Feature[];
}) {
  return (
    <div className="mb-6">
      {/* Category Title */}
      <h4 className="text-md font-bold text-gray-700 mb-2">
        {translateCategory(category)}
      </h4>
      {/* Features List */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <img
              src={feature.iconUrl}
              alt={feature.featureLabel}
              className="w-6 h-6"
            />
            <span className="text-sm text-gray-600">{feature.featureLabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to translate category names
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