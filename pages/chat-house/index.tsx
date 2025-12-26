import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import { Accommodation, ServerAddress } from "@/enum/url";

function ChatHouse() {
  const router = useRouter();
  const { reserveId, username } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reserveId || !username) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.GetAllChats}?ReserveId=${reserveId}&Username=${encodeURIComponent(username as string)}`,
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

        console.log("Fetched messages:", response);
      } catch (err) {
        setError("خطا در دریافت پیام‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [reserveId, username]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold text-gray-700 mb-4">شما وارد صفحه چت شدید!</h2>
      {loading && <div>در حال دریافت پیام‌ها...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-full max-w-md space-y-2">
        {/* {messages.length === 0 && !loading && <div>پیامی وجود ندارد.</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded">
            <div className="text-sm text-gray-600">{msg.senderName}</div>
            <div className="text-base">{msg.text}</div>
            <div className="text-xs text-gray-400">{msg.creationTime}</div>
          </div>
        ))} */}
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

export default ChatHouse;