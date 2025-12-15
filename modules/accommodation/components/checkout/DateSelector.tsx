import { useState, useEffect } from "react";
import UpdateFormModal from "@/modules/accommodation/components/checkout/UpdateFormModal";
import ModalPortal from "@/modules/shared/components/ui/ModalPortal";
import { EditBeautiful } from "@/modules/shared/components/ui/icons";

type DateSelectorProps = {
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  onUpdate: (newCheckIn: string, newCheckOut: string, newGuestsCount: number) => void;
};

export const convertToJalali = (gregorianDate: string): string => {
  if (!gregorianDate) return "تاریخ نامعتبر";

  const date = new Date(gregorianDate);
  if (isNaN(date.getTime())) return "تاریخ نامعتبر";

  const options = { year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian" } as const;
  return new Intl.DateTimeFormat("fa-IR", options).format(date);
};

function DateSelector({ checkIn, checkOut, guestsCount, onUpdate }: DateSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dates, setDates] = useState({ checkIn, checkOut, guestsCount });

  useEffect(() => {
    setDates({ checkIn, checkOut, guestsCount });
  }, [checkIn, checkOut, guestsCount]);

  const handleSave = (newCheckIn: string, newCheckOut: string, newGuestsCount: number) => {
    setDates({ checkIn: newCheckIn, checkOut: newCheckOut, guestsCount: newGuestsCount });
    onUpdate(newCheckIn, newCheckOut, newGuestsCount);

    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white border rounded-lg mt-4">
      <div className="flex justify-between items-end">
        <div>
          <div className="mb-4">
            <h4 className="text-md font-bold">تاریخ ورود و خروج</h4>
            <p className="text-sm text-gray-500">
              {convertToJalali(dates.checkIn)} تا {convertToJalali(dates.checkOut)}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-md font-bold">تعداد مسافران</h4>
            <p className="text-sm text-gray-500">{dates.guestsCount} نفر</p>
          </div>
        </div>
        <button
          className="text-blue-500 mb-4 text-xs flex flex-row items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <EditBeautiful className="w-4 h-4 fill-current" />
          ویرایش
        </button>
      </div>

      <ModalPortal selector="modal_portal" show={isModalOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4">ویرایش</h3>

            <UpdateFormModal
              defaultDates={[dates.checkIn, dates.checkOut]}
              defaultCapacity={dates.guestsCount}
              onSave={(newCheckIn, newCheckOut, newGuestsCount) =>
                handleSave(newCheckIn, newCheckOut, newGuestsCount)
              }
            />

            {/* <div className="flex justify-end mt-6 gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                انصراف
              </button>
            </div> */}
          </div>
        </div>
      </ModalPortal>
    </div>
  );
}

export default DateSelector;