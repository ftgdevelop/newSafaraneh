import { useState } from "react";
import MultiRangePicker from "@/modules/shared/components/ui/MultiRangePicker";
import CustomRangeInput from "@/modules/shared/components/ui/CustomRangeInput";
import SelectCounter from "@/modules/accommodation/components/shared/SelectCounter";

type Props = {
  defaultDates?: [string, string];
  defaultCapacity?: number;
  onUpdate?: (checkin: string, checkout: string, capacity: number) => void;
};

const UpdateForm: React.FC<Props> = ({ defaultDates, defaultCapacity, onUpdate }) => {
  const [checkinState, setCheckin] = useState(defaultDates?.[0] || "2025-11-30");
  const [checkoutState, setCheckout] = useState(defaultDates?.[1] || "2025-12-30");
  const [capacityState, setCapacity] = useState<number>(defaultCapacity || 1);
  const [dates, setDates] = useState<string[]>([checkinState, checkoutState]);

  const dateChangeHandle = (value: string[]) => {
    if (value[0] && value[1]) {
      setDates(value);
      setCheckin(value[0]);
      setCheckout(value[1]);
      if (onUpdate) onUpdate(value[0], value[1], capacityState);
    }
  };

  const handleCapacityChange = (newCapacity: number | string) => {
    setCapacity(Number(newCapacity));
    if (onUpdate) onUpdate(checkinState, checkoutState, Number(newCapacity));
  };

  return (
    <div className="update-form">
      <form>
        {/* !! Todo change this range with range picker 2  */}
        {/* <div className="mb-4">
          <RangePicker
            value={[checkinState, checkoutState]}
            onChange={dateChangeHandle}
            rtl
            locale={localeFa}
          />
        </div> */}

        {/* Please Use Here */}
        <MultiRangePicker
          initialValue={dates}
          onChange={dateChangeHandle}
          value={dates}
          Input={CustomRangeInput}
        />

        <div className="my-8 flex justify-between items-center">
          <label className="block text-sm font-bold mb-2">تعداد مسافران</label>
          <SelectCounter
            value={capacityState}
            min={1}
            max={10}
            onChange={handleCapacityChange}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;