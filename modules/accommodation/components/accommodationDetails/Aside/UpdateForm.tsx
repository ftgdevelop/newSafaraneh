import { useState, useEffect } from "react";
import { localeFa } from "@mobiscroll/react";
import RangePicker from "@/modules/shared/components/ui/RangePicker";
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

  // Trigger `onUpdate` whenever the state changes
  useEffect(() => {
    if (onUpdate) {
      onUpdate(checkinState, checkoutState, capacityState);
    }
  }, [checkinState, checkoutState, capacityState, onUpdate]);

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

  return (
    <div className="update-form">
      <div className="mb-4">
        <RangePicker
          value={[checkinState, checkoutState]}
          onChange={dateChangeHandle}
          rtl
          locale={localeFa}
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
    </div>
  );
};

export default UpdateForm;