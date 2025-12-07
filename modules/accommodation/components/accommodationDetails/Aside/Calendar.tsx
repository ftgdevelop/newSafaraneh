import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "@/modules/accommodation/components/accommodationDetails/Aside/UpdateForm";
import { ServerAddress, Accommodation } from "@/enum/url";
import Button from "@/modules/shared/components/ui/Button";

type CalendarProps = {
  id: number;
  checkin: string;
  checkout: string;
  capacity: number;
  onUpdate: (checkin: string, checkout: string, capacity: number) => void;
  bookingToken: string; // Add bookingToken as a prop
};

const Calendar: React.FC<CalendarProps> = ({ id, checkin, checkout, capacity, onUpdate, bookingToken }) => {
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
              tenantId: 7,
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
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
            tenantId: 7,
            apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
            "accept-language": "fa-IR",
            currency: "EUR",
            "Content-Type": "application/json",
          },
        }
      );

      const { preReserveKey } = response.data.result;

      // Redirect to the checkout page with query parameters
      // const checkoutUrl = `/fa/accommodation/checkout/key=${preReserveKey}?houseId=${id}&checkIn=${checkin}&checkOut=${checkout}&guestsCount=${capacity}`;
      const checkoutUrl = `/fa/accommodation/checkout/key=${preReserveKey}`;
      console.log("Redirecting to:", checkoutUrl);
      window.location.href = checkoutUrl; // Redirect to the checkout page
    } catch (error) {
      console.error("Error validating reservation:", error);
      alert("خطا در تایید رزرو. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg">
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

      {/* UpdateForm for updating checkin, checkout, and capacity */}
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
        <div className="h-10 bg-gray-300 rounded"></div>
      ) : (
        <Button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={handleReservation}
        >
          درخواست رزرو
        </Button>
      )}
    </div>
  );
};

export default Calendar;