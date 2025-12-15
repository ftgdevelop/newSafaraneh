import { useState, useRef, useEffect } from "react";
import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";
import { UpCaret } from "@/modules/shared/components/ui/icons";

type Option = { value: string; label: string };

type Props = {
  values: string[];
  onChange: (val: string[]) => void;
  types: Option[];
};

export default function FiltersByParking({ values, onChange, types }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parkingValue, setParkingValue] = useState<string[]>(values);

  useEffect(() => setParkingValue(values), [values]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, parkingValue]);

  const handleTypeChange = (selected: string[]) => {
    setParkingValue(selected);
    onChange(selected);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="cursor-pointer font-semibold flex justify-between items-center select-none"
      >
        پارکینگ
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
            values={parkingValue}
            items={types}
            onChange={handleTypeChange}
          />
        </div>
      </div>
    </div>
  );
}