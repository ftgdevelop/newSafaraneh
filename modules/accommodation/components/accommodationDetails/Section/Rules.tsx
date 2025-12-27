import { useState, useEffect } from "react";
import { UpCaret, DownCaret } from "@/modules/shared/components/ui/icons"; // Import the icons

type RulesProps = {
  rules: {
    accommodates: number;
    maxAccommodates: number;
    checkin: string | null;
    checkout: string | null;
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
  if (!rules) {
    return null;
  }

  const {
    accommodates,
    maxAccommodates,
    checkin,
    checkout,
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const rulesList = [
    { label: "ظرفیت استاندارد", value: `${accommodates} نفر` },
    { label: "حداکثر ظرفیت", value: `${maxAccommodates} نفر` },
    { label: "زمان ورود", value: `${checkin || "-"}` },
    { label: "زمان خروج", value: `${checkout || "-"}` },
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
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">قوانین اقامتگاه</h2>
      <ul className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 list-disc gap-2 md:gap-4">
        {visibleRules
          .filter(rule => rule.label !== "توضیحات قوانین")
          .map((rule, index) => (
            <li key={index} className="flex flex-row items-center justify-between w-full bg-gray-50 p-1 md:p-2 rounded-xl border border-gray-100">
              <span className="font-bold">{rule.label}</span>
              <span>{rule.value}</span>
            </li>
          ))}
      </ul>
      {/* توضیحات قوانین به صورت عنوان جدا */}
      {/* {visibleRules.some(rule => rule.label === "توضیحات قوانین") && (
        <>
          <h3 className="text-base md:text-lg font-bold text-[#1d274b] mt-8 mb-2">توضیحات قوانین</h3>
          <ul className="space-y-2 text-sm text-gray-600 list-disc mr-4">
            {(rulesDescription ?? "")
            .split("\n")
            .filter(line => line.trim())
            .map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </>
      )} */}
      {rulesList.length > 4 && (
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

export default Rules;