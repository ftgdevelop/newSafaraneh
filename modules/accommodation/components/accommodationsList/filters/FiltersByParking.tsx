import { useState, useRef, useEffect } from "react";
import SelectCounter from "../../shared/SelectCounter";
import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";
import { UpCaret } from "@/modules/shared/components/ui/icons";

type Option = { value: string; label: string };

type ParkingValue = {
  type: string[];
  capacity: number;
};

type Props = {
  values: ParkingValue;
  onChange: (val: ParkingValue) => void;
  types: Option[];
  capacityMin: number;
  capacityMax: number;
};

export default function FiltersByParking({ values, onChange, types, capacityMin, capacityMax }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parkingValue, setParkingValue] = useState<ParkingValue>(values);

  useEffect(() => setParkingValue(values), [values]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, parkingValue]);

  const handleTypeChange = (selected: string[]) => {
    const updated = { ...parkingValue, type: selected };
    setParkingValue(updated);
    onChange(updated);
  };

  const handleCapacityChange = (val: number) => {
    const updated = { ...parkingValue, capacity: val };
    setParkingValue(updated);
    onChange(updated);
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
            values={parkingValue.type}
            items={types}
            onChange={handleTypeChange}
          />

          <div className="flex items-center justify-between mt-2">
            <div>تعداد پارکینگ {parkingValue.capacity}</div>
            <SelectCounter
              value={parkingValue.capacity}
              min={capacityMin}
              max={capacityMax}
              onChange={handleCapacityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}