import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "@/modules/accommodation/components/accommodationDetails/Aside/UpdateForm";
import { ServerAddress, Accommodation } from "@/enum/url";
import Button from "@/modules/shared/components/ui/Button";
import { useRouter } from "next/router";

type CalendarProps = {
  id: number;
  checkin: string;
  checkout: string;
  capacity: number;
  onUpdate: (checkin: string, checkout: string, capacity: number) => void;
  bookingToken: string; // Add bookingToken as a prop
};

const Calendar: React.FC<CalendarProps> = ({ id, checkin, checkout, capacity, onUpdate, bookingToken }) => {
  const router = useRouter();
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);
  const [startingPrice, setStartingPrice] = useState<number>(0);

  const formatDateWithTime = (date: string) => `${date}T00:39:53.644Z`;

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Calendar}`,
          {
            checkIn: formatDateWithTime(checkin),
            checkOut: formatDateWithTime(checkout),
            id,
          },
          {
            headers: {
              accept: "text/plain",
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.result || {};
        const calendar = data.calenders?.calendar || {};

        // Flatten the calendar data into a single array of days
        const flattenedDays = Object.keys(calendar).reduce((acc: any[], month) => {
          const days = calendar[month].map((day: any) => ({
            ...day,
            date: `${month}-${String(day.day).padStart(2, "0")}`, // Add full date
          }));
          return acc.concat(days);
        }, []);

        setCalendarData(flattenedDays);

        // Calculate total price and nights
        const prices = flattenedDays.map((item: any) => item.price.salePrice);
        const minPrice = Math.min(...prices);
        const total = prices.reduce((sum: number, price: number) => sum + price, 0);

        setStartingPrice(minPrice);
        setTotalPrice(total);
        setNights(flattenedDays.length);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [id, checkin, checkout]);

  const handleReservation = async () => {
    setLoadingButton(true);
    try {
      const response = await axios.post(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Validate}`,
        {
          checkin: formatDateWithTime(checkin),
          checkout: formatDateWithTime(checkout),
          bookingToken,
          guestsCount: capacity,
          metaSearchName: "",
          metaSearchKey: "",
        },
        {
          headers: {
            accept: "text/plain",
            apikey: process.env.PROJECT_SERVER_APIKEY,
            tenantId: process.env.PROJECT_SERVER_TENANTID,
            "accept-language": "fa-IR",
            currency: "EUR",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.result.preReserveKey) {
        router.push(`/accommodation/checkout?key=${response.data.result.preReserveKey}`);
        console.log(`/accommodation/checkout?key=${response.data.result.preReserveKey}`);
      } else {
        alert("خطا در دریافت کلید رزرو. لطفا دوباره تلاش کنید.");
      }

    } catch (error) {
      console.error("Error validating reservation:", error);
      alert("خطا در تایید رزرو. لطفا دوباره تلاش کنید.");
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-xl shadow-xl">
      <h3 className="text-lg font-bold mb-4">جزئیات اقامت</h3>

      {loading ? (
        <div className="mb-4 flex justify-between">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-7 bg-gray-300 rounded w-32"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between">
            <span className="text-sm text-gray-500">شروع قیمت از:</span>
            <span className="text-md font-bold">
              {startingPrice.toLocaleString()} تومان / هر شب
            </span>
          </div>
        </>
      )}

      <div className="mt-6">
        <UpdateForm
          defaultDates={[checkin, checkout]}
          defaultCapacity={capacity}
          onUpdate={(newCheckin, newCheckout, newCapacity) => {
            onUpdate(newCheckin, newCheckout, newCapacity);
          }}
        />
      </div>
      
      {loading ? (
        <div className="my-6 space-y-4">
          <div className="mb-4 flex justify-between">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-7 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-7 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      ) : (
        <div className="my-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">مدت اقامت:</span>
            <span className="text-md font-bold">{nights} شب</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">مبلغ کل:</span>
            <span className="text-md font-bold">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">مبلغ قابل پرداخت:</span>
            <span className="text-md font-bold">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="h-10 bg-gray-300 rounded flex items-center justify-center">
          <div role="status">
              <svg aria-hidden="true" className="w-7 h-7 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">درحال بارگذاری</span>
          </div>
        </div>
      ) : (
        <>
          {
            loadingButton ? (
              <div className="h-10 bg-gray-300 rounded flex items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" className="w-7 h-7 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">درحال بارگذاری</span>
                </div>
              </div>
            ) :
              <Button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-gray-200"
                onClick={handleReservation}
              >
                درخواست رزرو
              </Button>
          }
        </>
      )}
    </div>
  );
};

export default Calendar;