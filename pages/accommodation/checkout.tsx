import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Accommodation, ServerAddress } from "@/enum/url";
import Section from "@/modules/accommodation/components/checkout/Section";
import Aside from "@/modules/accommodation/components/checkout/Aside";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DateSelector from "@/modules/accommodation/components/checkout/DateSelector";
import Button from "@/modules/shared/components/ui/Button";
import { GetServerSideProps } from "next";

function AccommodationCheckout() {
  const router = useRouter();
  const { key } = router.query;
  console.log("key in checkout page:", key);

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

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [shakeError, setShakeError] = useState(false);
  const submitFormRef = useRef<() => void>();

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
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
              "accept-language": "fa-IR",
              currency: "EUR",
            },
          }
        );

        const { checkin, checkout, guestsCount, houseId } = response.data.result;
        setValidationData({ checkin, checkout, guestsCount, houseId });


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
              apikey: process.env.PROJECT_SERVER_APIKEY,
              tenantId: process.env.PROJECT_SERVER_TENANTID,
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

  const handlePassengerInfoSubmit = async (passengerInfoValues: { firstName: string; lastName: string; phoneNumber: string }) => {
    const info = passengerInfoValues || passengerInfo;
    if (!info || !info.firstName || !info.lastName || !info.phoneNumber) {
      setGeneralError("لطفا تمام اطلاعات مسافر را تکمیل کنید.");
      setShakeError(true);
      setTimeout(() => setShakeError(false), 300);
      return;
    }

    try {
      setLoading(true);
      setGeneralError(null);

      // const preReserveKey = Array.isArray(key) ? key[0].replace("key=", "") : key?.replace("key=", "");
      const preReserveKey = Array.isArray(key) ? key[0] : key;

      const requestBody = {
        passengers: [
          {
            roomNumber: 0,
            gender: true,
            firstName: info.firstName,
            lastName: info.lastName,
            nationalId: "",
            nationality: "AF",
            extraBed: 0,
            childrenAge: [0],
          },
        ],
        reserver: {
          nationalId: "",
          firstName: info.firstName,
          lastName: info.lastName,
          phoneNumber: info.phoneNumber,
          email: "",
          userName: info.phoneNumber,
          gender: true,
          passportNumber: "",
        },
        specialRequest: "",
        preReserveKey: preReserveKey,
      };

      const response = await axios.post(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.PreReserve}`,
        requestBody,
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

      if (response.status === 200 && response.data.result) {
        const reserveId = response.data.result.id;
        const username = response.data.result.username;
        const status = response.data.result.status;

        if (status === "Pending") {
          router.push(`/payment?reserveId=${reserveId}&username=${encodeURIComponent(username)}`);
        } else if (status === "Registered") {
          router.push(`/chat-house?reserveId=${reserveId}&username=${encodeURIComponent(username)}`);
        } else {
          setGeneralError("وضعیت رزرو نامشخص است.");
        }
      } else {
        console.error("Unexpected response format or status:", response);
        setGeneralError("خطا در پردازش رزرو. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error during pre-reserve:", error);
      alert("خطا در رزرو اولیه. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-container mx-auto px-3 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-screen">
        <div className="lg:col-span-4">
          <Section
            host={house?.host}
            onSubmitPassengerInfo={(values) => {
              setPassengerInfo(values);
              handlePassengerInfoSubmit(values);
            }}
            onSubmitTrigger={(submitForm) => {
              submitFormRef.current = submitForm;
            }}
          />

          {
            house ? (
              validationData && (
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
              )
            ) : (
              <div className="p-4 bg-white border rounded-lg mt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="mb-6">
                      <div className="w-32 h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="mb-4">
                      <div className="w-28 h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mb-4" />
                </div>
              </div>
            )}
            
        </div>
        <div className="lg:col-span-2">
          <Aside house={house} />
          
          <div className="mt-6 max-sm:mb-6">
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
              className="w-full !bg-[#412691] hover:!bg-[#412691]/70 text-white py-2 !rounded-full"
              onClick={() => {
                if (submitFormRef.current) submitFormRef.current();
              }}
              disabled={loading}
              type="button"
            >
              {loading ? 
                <div role="status">
                    <svg aria-hidden="true" className="w-7 h-7 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">درحال بارگذاری</span>
                </div>
               : 
               "پرداخت"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  if (!process.env.PROJECT_MODULES?.includes("Accommodation")) {
    return { notFound: true };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "hotel", "home"])),
    },
  };
};

export default AccommodationCheckout;