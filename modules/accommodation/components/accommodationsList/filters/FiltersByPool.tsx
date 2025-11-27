import { useState, useRef, useEffect } from "react";
import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";
import { UpCaret } from "@/modules/shared/components/ui/icons";

type PoolFilterProps = {
  value: { exists: boolean; hasWarmWater: boolean; type: string[] };
  onChange: (value: { exists: boolean; hasWarmWater: boolean; type: string[] }) => void;
};

export default function FiltersByPool({ value, onChange }: PoolFilterProps) {
  const [poolValue, setPoolValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => setPoolValue(value), [value]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, poolValue]);

  const handleCheckboxChange = (field: "exists" | "hasWarmWater") => {
    const updated = { ...poolValue, [field]: !poolValue[field] };
    setPoolValue(updated);
    onChange(updated);
  };

  const handleTypeChange = (types: string[]) => {
    const updated = { ...poolValue, type: types };
    setPoolValue(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="cursor-pointer font-semibold flex justify-between items-center select-none"
      >
        استخر
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <UpCaret className="w-5 h-5" />
        </span>
      </div>

      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className="pl-2 mt-1 flex flex-col gap-2">
          <CheckboxGroup
            values={poolValue.exists ? ["exists"] : []}
            items={[{ value: "exists", label: "استخر دارد" }]}
            onChange={() => handleCheckboxChange("exists")}
          />
          <CheckboxGroup
            values={poolValue.hasWarmWater ? ["hasWarmWater"] : []}
            items={[{ value: "hasWarmWater", label: "آب گرم دارد" }]}
            onChange={() => handleCheckboxChange("hasWarmWater")}
          />
          <CheckboxGroup
            values={poolValue.type}
            items={[
              { value: "Indoor", label: "سرپوشیده" },
              { value: "Outdoor", label: "رو باز" },
            ]}
            onChange={handleTypeChange}
          />
        </div>
      </div>
    </div>
  );
}
