import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Accommodation, ServerAddress } from "@/enum/url";
import Section from "@/modules/accommodation/components/checkout/Section";
import Aside from "@/modules/accommodation/components/checkout/Aside";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DateSelector from "@/modules/accommodation/components/checkout/DateSelector";
import Button from "@/modules/shared/components/ui/Button";

function AccommodationCheckout() {
  const router = useRouter();
  const { key } = router.query; // فقط key از URL خوانده می‌شود

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [validationData, setValidationData] = useState<{
    checkin: string;
    checkout: string;
    guestsCount: number;
    houseId: number;
  } | null>(null);
  const [passengerInfo, setPassengerInfo] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
  } | null>(null);

  const [generalError, setGeneralError] = useState<string | null>(null); // State for general error message
  const [shakeError, setShakeError] = useState(false); // State to control shake animation

  // Fetch validation data using the key
  useEffect(() => {
    const fetchValidationData = async () => {
      if (!key) return;

      try {
        setLoading(true);
        const formattedKey = Array.isArray(key) ? key[0].replace("key=", "") : key.replace("key=", "");
        const response = await axios.get(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetValidate}?Id=${formattedKey}`,
          {
            headers: {
              accept: "text/plain",
              tenantId: 7,
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
            },
          }
        );

        // ذخیره داده‌های دریافتی در State
        const { checkin, checkout, guestsCount, houseId } = response.data.result;
        setValidationData({ checkin, checkout, guestsCount, houseId });

        // Fetch house details
        fetchHouseDetails(houseId);
      } catch (error) {
        console.error("Error fetching validation data:", error);
        setGeneralError("خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    const fetchHouseDetails = async (houseId: number) => {
      try {
        const response = await axios.get(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetHouse}?Id=${houseId}`,
          {
            headers: {
              accept: "text/plain",
              tenantId: 7,
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
            },
          }
        );

        setHouse(response.data.result || null);
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchValidationData();
  }, [key]);

  const handlePassengerInfoSubmit = async () => {
    if (!passengerInfo || !passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.phoneNumber) {
      console.error("Passenger information is incomplete."); // Debugging log
      setGeneralError("لطفا تمام اطلاعات مسافر را تکمیل کنید."); // Set general error message
      setShakeError(true); // Trigger shake animation
      setTimeout(() => setShakeError(false), 300); // Remove shake class after animation duration
      return; // Do not proceed if passengerInfo is incomplete
    }

    try {
      setLoading(true); // Show loading state while the request is being processed
      setGeneralError(null); // Clear general error message

      // Extract the preReserveKey as a string and remove the "key=" prefix
      const preReserveKey = Array.isArray(key) ? key[0].replace("key=", "") : key?.replace("key=", "");

      // API Request
      const requestBody = {
        passengers: [
          {
            roomNumber: 0,
            gender: true, // Replace with actual gender if available
            firstName: passengerInfo.firstName,
            lastName: passengerInfo.lastName,
            nationalId: "", // Replace with actual national ID if available
            nationality: "AF", // Replace with actual nationality if available
            extraBed: 0,
            childrenAge: [0], // Replace with actual children ages if available
          },
        ],
        reserver: {
          nationalId: "", // Replace with actual national ID if available
          firstName: passengerInfo.firstName,
          lastName: passengerInfo.lastName,
          phoneNumber: passengerInfo.phoneNumber,
          email: "", // Replace with actual email if available
          userName: "+989358891888", // Replace with actual username if available
          gender: true, // Replace with actual gender if available
          passportNumber: "", // Replace with actual passport number if available
        },
        specialRequest: "", // Replace with actual special request if available
        preReserveKey: preReserveKey, // Ensure it's a string without "key="
      };

      const response = await axios.post(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.PreReserve}`,
        requestBody,
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

      if (response.status === 200 && response.data.result) {
        const reserveId = response.data.result.id;
        const username = response.data.result.username;

        // Redirect to the payment page with dynamic query parameters
        router.push(`/fa/payment?reserveId=${reserveId}&username=${encodeURIComponent(username)}`);
      } else {
        console.error("Unexpected response format or status:", response);
        setGeneralError("خطا در پردازش رزرو. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      // Handle Error
      console.error("Error during pre-reserve:", error);
      alert("خطا در رزرو اولیه. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-container mx-auto px-5 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-screen">
        <div className="lg:col-span-3">
          <Section
            host={house?.host}
            onSubmitPassengerInfo={(values) => {
              setPassengerInfo(values); // Update the passengerInfo state
            }}
          />

          {/* Date Selector */}
          {validationData && (
            <DateSelector
              checkIn={validationData.checkin}
              checkOut={validationData.checkout}
              guestsCount={validationData.guestsCount}
              onUpdate={(newCheckIn, newCheckOut, newGuestsCount) => {
                setValidationData((prev) => ({
                  ...prev!,
                  checkin: newCheckIn,
                  checkout: newCheckOut,
                  guestsCount: newGuestsCount,
                }));
              }}
            />
          )}
        </div>
        <div className="lg:col-span-2">
          <Aside house={house} />
          <div className="p-4 bg-white border rounded-lg mt-6">
            {/* General Error Message */}
            {generalError && (
              <div
                className={`text-red-500 text-sm mb-4 transition-transform duration-300 text-center ${
                  shakeError ? "translate-x-2" : "translate-x-0"
                }`}
              >
                {generalError}
              </div>
            )}

            <Button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handlePassengerInfoSubmit}
              disabled={loading}
            >
              {loading ? "در حال پردازش..." : "پرداخت"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
  },
});

export default AccommodationCheckout;