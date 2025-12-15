import { useState } from "react";
import SelectCounter from "@/modules/accommodation/components/shared/SelectCounter";
import Button from "@/modules/shared/components/ui/Button";
import RangePicker2 from "@/modules/shared/components/ui/RangePicker2";
import CustomRangeInput, { OuterProps } from "@/modules/shared/components/ui/CustomRangeInput";

type Props = {
  defaultDates?: [string, string];
  defaultCapacity?: number;
  onSave?: (checkin: string, checkout: string, capacity: number) => void;
};

const UpdateFormModal: React.FC<Props> = ({ defaultDates, defaultCapacity, onSave }) => {
  const [checkinState, setCheckin] = useState(defaultDates?.[0] || "");
  const [checkoutState, setCheckout] = useState(defaultDates?.[1] || "");
  const [capacityState, setCapacity] = useState<number>(defaultCapacity || 1);

  // Handle date changes from RangePicker
  const dateChangeHandle = (event: any) => {
    if (event.value[0] && event.value[1]) {
      setCheckin(event.value[0]);
      setCheckout(event.value[1]);
    }
  };

  // Handle capacity changes from SelectCounter
  const handleCapacityChange = (newCapacity: number | string) => {
    setCapacity(Number(newCapacity));
  };

  // Save changes and call `onSave`
  const handleSave = () => {
    if (onSave) {
      onSave(checkinState, checkoutState, capacityState);
    }
  };

  return (
    <div className="update-form">
      <div className="mb-4">
        <RangePicker2<OuterProps>
          value={[checkinState, checkoutState]}
          onChange={dateChangeHandle}
          Input={CustomRangeInput}
        />
      </div>

      <div className="my-8 flex justify-between items-center">
        <label className="block text-sm font-bold mb-2">تعداد مسافران</label>
        <SelectCounter
          value={capacityState}
          min={1}
          max={10}
          onChange={handleCapacityChange}
        />
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSave}
        >
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default UpdateFormModal;