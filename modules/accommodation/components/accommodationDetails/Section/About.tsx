import { useState, useEffect } from "react";
import { UpCaret, DownCaret } from "@/modules/shared/components/ui/icons"; // Import the icons

type AboutProps = {
  about: string;
};

function About({ about }: AboutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton loading placeholders
    return (
      <div className="py-16 border-b pb-16">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 border-b pb-16">
      <h2 className="text-lg md:text-xl text-right font-bold text-[#1d274b] mb-5">درباره اقامتگاه</h2>
      <p
        className={`text-sm sm:text-md text-gray-600 leading-6 ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {about}
      </p>
      <button
        onClick={toggleExpand}
        className="flex items-center gap-1 text-blue-500 text-sm mt-4 focus:outline-none bg-blue-50 px-3 py-1 rounded-full"
      >
        {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
        {isExpanded ? <UpCaret className="w-4 h-4 fill-blue-500" /> : <DownCaret className="w-4 h-4 fill-blue-500" />}
      </button>
    </div>
  );
}

export default About;