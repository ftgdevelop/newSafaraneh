import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import SelectPassengers from "@/modules/accommodation/components/shared/SelectPassengers";

type Props = {
  min: number;
  max: number;
  defaultValue: number | null;
  onChange?: (value: number) => void;
};

function FiltersByGuestCapacity({ min, max, defaultValue, onChange }: Props) {
const [open, setOpen] = useState(false);
const [selected, setSelected] = useState<number>(defaultValue ?? min);
const router = useRouter();
const dropdownRef = useRef<HTMLDivElement>(null);

// For SelectPassengers
const [passengerValues, setPassengerValues] = useState<{ adult: number }>({ adult: defaultValue ?? min });

useEffect(() => {
  setPassengerValues({ adult: defaultValue ?? min });
  setSelected(defaultValue ?? min);
}, [defaultValue]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSubmit = () => {
    setOpen(false);
    const adultValue = passengerValues.adult ?? min;
    onChange?.(adultValue);

    let segments = Array.isArray(router.query.accommodationsList)
      ? [...router.query.accommodationsList]
      : typeof router.query.accommodationsList === "string"
        ? [router.query.accommodationsList]
        : [];

    const capacityIndex = segments.findIndex(seg => seg.startsWith("capacity-"));
    const newCapacitySegment = `capacity-${adultValue}`;

    if (capacityIndex !== -1) {
      segments[capacityIndex] = newCapacitySegment;
    } else {
      segments.push(newCapacitySegment);
    }

    const newPath = router.pathname.replace("[...accommodationsList]", segments.join("/"));

    const newQuery = {
      ...router.query,
      accommodationsList: segments,
    };

    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      newPath + window.location.search,
      { shallow: true }
    );
  };

  const handleClear = () => {
    setPassengerValues({ adult: min });
    setSelected(min);
    onChange?.(min);

    let segments = Array.isArray(router.query.accommodationsList)
      ? [...router.query.accommodationsList]
      : typeof router.query.accommodationsList === "string"
        ? [router.query.accommodationsList]
        : [];

    const capacityIndex = segments.findIndex(seg => seg.startsWith("capacity-"));
    const newCapacitySegment = `capacity-${min}`;

    if (capacityIndex !== -1) {
      segments[capacityIndex] = newCapacitySegment;
    } else {
      segments.push(newCapacitySegment);
    }

    const newPath = router.pathname.replace("[...accommodationsList]", segments.join("/"));

    const newQuery = {
      ...router.query,
      accommodationsList: segments,
    };

    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      newPath + window.location.search,
      { shallow: true }
    );

    setOpen(false);
  };


  const setFieldValue = (field: string, value: number) => {
    setPassengerValues(prev => ({
      ...prev,
      [field]: value
    }));
    setSelected(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full text-right border rounded-full px-3 py-2 mb-2 font-bold bg-white text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        تعداد مسافران {(passengerValues.adult ?? 0) > 0 && `(${passengerValues.adult ?? 0})`}
      </button>
      {open && (
        <div className="absolute z-10 bg-white border rounded shadow-md p-4 w-64 mt-2 right-0">
          <SelectPassengers
            values={passengerValues}
            setFieldValue={setFieldValue}
            wrapperClassNames="shrink-0"
            // min={min}
            // max={max}
            simple
          />
          <div className="flex justify-between mt-4">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={handleSubmit}
              type="button"
            >
              تایید
            </button>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              onClick={handleClear}
              type="button"
            >
              پاک کردن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersByGuestCapacity;