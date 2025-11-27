import CheckboxSwitch from "@/modules/shared/components/ui/CheckboxSwitch";

interface Props {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const FilterByIsInstant = ({ checked, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span>رزرو آنی</span>
      
      <CheckboxSwitch
        initialChecked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterByIsInstant;
