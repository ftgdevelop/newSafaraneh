import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState, useCallback } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { Accommodation, ServerAddress } from "@/enum/url";
import Aside from "@/modules/accommodation/components/chatHouse/Aside";
import HostInfo from "@/modules/accommodation/components/chatHouse/HostInfo";
import ChatBox from "@/modules/accommodation/components/chatHouse/ChatBox";
import Button from "@/modules/shared/components/ui/Button";

function ChatHouse() {
  const router = useRouter();
  const { reserveId, username } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reserveInfo, setReserveInfo] = useState<any>(null);
  const [house, setHouse] = useState<any>(null);

  const fetchMessages = useCallback(async () => {
    if (!reserveId || !username) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetAllChats}?ReserveId=${reserveId}&Username=${encodeURIComponent(
          username as string
        )}`,
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

      setMessages(response.data.result.messages || []);
    } catch (err) {
      setError("خطا در دریافت پیام‌ها");
    } finally {
      setLoading(false);
    }
  }, [reserveId, username]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!reserveId || !username) return;

    const fetchReserveDetails = async () => {
      try {
        const response = await axios.get(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetReserveById}?ReserveId=${reserveId}&Username=${username}`,
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

        setReserveInfo(response.data.result || null);
        fetchHouseDetails(response.data.result.houseId);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHouseDetails = async (houseId: number) => {
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
    };

    fetchReserveDetails();
  }, [reserveId, username]);

  return (
    <div className="max-w-container mx-auto px-3 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
        <div className="lg:col-span-4">
          <h1>چت با میزبان</h1>
          <HostInfo host={house?.host} />

          <ChatBox
            messages={messages}
            reserveId={reserveId as string}
            username={username as string}
            onMessageSent={fetchMessages}
          />

          {loading && <div className="mt-2">در حال دریافت پیام‌ها...</div>}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        <div className="lg:col-span-2">
          <Aside house={house} reserveInfo={reserveInfo} />
          <div className="mt-6 max-sm:mb-6">
            <Button className="w-full !bg-[#412691] hover:!bg-[#412691]/70 text-white py-2 !rounded-full">
              پرداخت
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
      ...(await serverSideTranslations(context.locale, [
        "common",
        "hotel",
        "home",
      ])),
    },
  };
};

export default ChatHouse;