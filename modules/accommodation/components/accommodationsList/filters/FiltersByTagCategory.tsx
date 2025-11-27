import { useEffect, useState } from "react";

type Props = {
  items: { value: string; label: React.ReactNode; icon?: React.ReactNode }[];
  values: string[];
  onChange: (values: string[]) => void;
};

export default function FiltersByTagCategory({ items, values, onChange }: Props) {
  const [selected, setSelected] = useState<string[]>(values);
  useEffect(() => {
    setSelected(values);
  }, [values]);

  const toggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];

    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className="flex items-center gap-2 px-2 pt-4 overflow-x-auto">
      {items.map(item => (
        <button
          key={item.value}
          type="button"
          onClick={() => toggle(item.value)}
          className={`min-w-[75px] sm:min-w-[64px] flex flex-col items-center gap-1 pb-1 border-b-2 transition-colors text-sm ${
            selected.includes(item.value)
              ? "border-gray-700 text-gray-700 font-bold"
              : "border-transparent text-gray-400"
          }`}
        >
          {item.icon && (
            <div className={selected.includes(item.value) ? "opacity-100" : "opacity-60"}>
              {item.icon}
            </div>
          )}
          <span className="text-xs sm:text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
