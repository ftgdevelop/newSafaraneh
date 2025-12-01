import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "@/modules/accommodation/components/accommodationDetails/Aside/UpdateForm";
import { ServerAddress, Accommodation } from "@/enum/url";

type CalendarProps = {
  id: number;
  checkin: string;
  checkout: string;
  capacity: number;
  onUpdate: (checkin: string, checkout: string, capacity: number) => void;
};

const Calendar: React.FC<CalendarProps> = ({ id, checkin, checkout, capacity, onUpdate }) => {
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
        setCalendarData(response.data.result || []);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [id, checkin, checkout]);

  return (
    <div className="p-4 bg-white border rounded-lg">
      <h3 className="text-lg font-bold mb-4">تقویم قیمت‌ها</h3>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : calendarData.length > 0 ? (
        <ul className="space-y-2">
          {calendarData.map((item, index) => (
            <li key={index} className="flex justify-between text-sm">
              <span>{item.date}</span>
              <span>{item.price} EUR</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>اطلاعاتی یافت نشد.</p>
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
    </div>
  );
};

export default Calendar;