import { useState, useRef, useEffect } from "react";
import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";

type Props = {
  values: string[];
  items: { value: string; label: React.ReactNode }[];
  onChange: (values: string[]) => void;
};

export default function FiltersByCategory({ values, items, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(values);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(values);
  }, [values]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const applyChanges = () => {
    setOpen(false);
    onChange(selected);
  };

  const clear = () => {
    setSelected([]);
    onChange([]);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-right border rounded-full px-3 py-2 mb-2 font-bold bg-white text-sm"
      >
        دسته‌بندی {selected.length > 0 && `(${selected.length})`}
      </button>

      {open && (
        <div className="absolute z-10 bg-white border rounded shadow-md p-4 w-64 mt-2 right-0">
          <CheckboxGroup
            values={selected}
            items={items}
            onChange={setSelected}
          />

          <div className="flex justify-between mt-4">
            <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={applyChanges}>
              تایید
            </button>

            <button type="button" className="px-3 py-1 bg-gray-200 text-gray-700 rounded" onClick={clear}>
              پاک کردن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
