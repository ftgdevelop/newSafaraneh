import { useState, useEffect } from "react";
import { UpCaret, DownCaret } from "@/modules/shared/components/ui/icons"; // Import the icons

type RulesProps = {
  rules: {
    accommodates: number;
    maxAccommodates: number;
    checkin: string | null;
    checkout: string | null;
    maxCheckinTime: string;
    maxCheckoutTime: string;
    rulesDescription: string;
    cancellationPlan: number;
    needMaritalDocuments: boolean;
    smoking: boolean;
    twentyFourHourEntry: boolean;
    playingMusic: boolean;
    singleGroup: boolean;
    freeForChildren: boolean;
    petsAllowed: boolean;
    ceremonyAllowed: boolean;
  };
};

function Rules({ rules }: RulesProps) {
  const {
    accommodates,
    maxAccommodates,
    checkin,
    checkout,
    maxCheckinTime,
    maxCheckoutTime,
    rulesDescription,
    needMaritalDocuments,
    smoking,
    twentyFourHourEntry,
    playingMusic,
    singleGroup,
    freeForChildren,
    petsAllowed,
    ceremonyAllowed,
  } = rules;

  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  const rulesList = [
    { label: "ظرفیت استاندارد", value: `${accommodates} نفر` },
    { label: "حداکثر ظرفیت", value: `${maxAccommodates} نفر` },
    { label: "زمان ورود", value: `${checkin || "نامشخص"} (تا ${maxCheckinTime})` },
    { label: "زمان خروج", value: `${checkout || "نامشخص"} (تا ${maxCheckoutTime})` },
    { label: "توضیحات قوانین", value: rulesDescription },
    { label: "نیاز به مدارک ازدواج", value: needMaritalDocuments ? "بله" : "خیر" },
    { label: "سیگار کشیدن", value: smoking ? "مجاز" : "غیرمجاز" },
    { label: "ورود ۲۴ ساعته", value: twentyFourHourEntry ? "مجاز" : "غیرمجاز" },
    { label: "پخش موسیقی", value: playingMusic ? "مجاز" : "غیرمجاز" },
    { label: "گروه مجردی", value: singleGroup ? "مجاز" : "غیرمجاز" },
    { label: "رایگان برای کودکان", value: freeForChildren ? "بله" : "خیر" },
    { label: "ورود حیوانات خانگی", value: petsAllowed ? "مجاز" : "غیرمجاز" },
    { label: "برگزاری مراسم", value: ceremonyAllowed ? "مجاز" : "غیرمجاز" },
  ];

  const visibleRules = showAll ? rulesList : rulesList.slice(0, 4);

  const toggleShowMore = () => {
    setShowAll((prev) => !prev);
  };

  if (loading) {
    // Skeleton loading placeholders
    return (
      <div className="py-16 border-b">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <ul className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="py-16 border-b">
      <h3 className="text-lg font-bold text-gray-800 mb-4">قوانین اقامتگاه</h3>
      <ul className="space-y-4 text-sm text-gray-600">
        {visibleRules.map((rule, index) => (
          <li key={index}>
            <span className="font-bold">{rule.label}:</span>{" "}
            {rule.label === "توضیحات قوانین" ? (
              <p className="mt-1 whitespace-pre-line">{rule.value}</p>
            ) : (
              rule.value
            )}
          </li>
        ))}
      </ul>
      {rulesList.length > 4 && (
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

export default Rules;