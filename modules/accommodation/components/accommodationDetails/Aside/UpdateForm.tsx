import { useState, useEffect } from "react";
import { localeFa } from "@mobiscroll/react";
import RangePicker from "@/modules/shared/components/ui/RangePicker";
import SelectCounter from "@/modules/accommodation/components/shared/SelectCounter";
import Button from "@/modules/shared/components/ui/Button";

type Props = {
  defaultDates?: [string, string];
  defaultCapacity?: number;
  onUpdate?: (checkin: string, checkout: string, capacity: number) => void;
};

const UpdateForm: React.FC<Props> = ({ defaultDates, defaultCapacity, onUpdate }) => {
  const [checkinState, setCheckin] = useState(defaultDates?.[0] || "2025-11-30");
  const [checkoutState, setCheckout] = useState(defaultDates?.[1] || "2025-12-30");
  const [capacityState, setCapacity] = useState<number>(defaultCapacity || 1);

  const dateChangeHandle = (event: any) => {
    if (event.value[0] && event.value[1]) {
      setCheckin(event.value[0]);
      setCheckout(event.value[1]);
    }
  };

  const handleCapacityChange = (newCapacity: number | string) => {
    setCapacity(Number(newCapacity)); // Ensure the value is always a number
  };

  const submitHandler = () => {
    if (!checkinState || !checkoutState) {
      // TODO: Add validation message
      return;
    }

    if (onUpdate) {
      onUpdate(checkinState, checkoutState, capacityState);
    }
  };

  return (
    <div className="update-form">
      <div className="mb-4">
        {/* <label className="block text-sm font-bold mb-2">تاریخ ورود و خروج</label> */}
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

      <Button
        onClick={submitHandler}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        بروزرسانی
      </Button>
    </div>
  );
};

export default UpdateForm;