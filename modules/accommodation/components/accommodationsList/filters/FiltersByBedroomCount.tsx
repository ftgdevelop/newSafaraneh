import SelectCounter from "../../shared/SelectCounter";

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

function FiltersByBedroomCount({ min, max, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>تعداد اتاق خواب {value > 0 && `(${value})`}</div>
      <SelectCounter value={value} min={min} max={max} onChange={onChange} />
    </div>
  );
}

export default FiltersByBedroomCount;
