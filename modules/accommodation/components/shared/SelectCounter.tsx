import Quantity from "@/modules/shared/components/ui/Quantity";

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

const SelectCounter: React.FC<Props> = ({ value, min, max, onChange }) => (
  <div>
    <Quantity
      style="B"
      min={min}
      max={max}
      onChange={onChange}
      initialValue={value}
    />
  </div>
);

export default SelectCounter;