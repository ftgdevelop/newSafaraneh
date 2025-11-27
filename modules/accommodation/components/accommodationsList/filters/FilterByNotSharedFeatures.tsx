import { useState, useRef, useEffect } from "react";
import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";
import { UpCaret } from "@/modules/shared/components/ui/icons";

type Item = { value: string; label: React.ReactNode };

type Props = {
  values?: string[];
  items: Item[];
  onChange: (values: string[]) => void;
};

export default function FilterByNotSharedFeatures({ values = [], items, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className="cursor-pointer font-semibold flex justify-between items-center select-none"
      >
        امکانات اختصاصی
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <UpCaret className="w-5 h-5" />
        </span>
      </div>

      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className="pl-2 mt-1">
          <CheckboxGroup
            values={values}
            items={items}
            onChange={(selected) => onChange(selected)}
          />
        </div>
      </div>
    </div>
  );
}
