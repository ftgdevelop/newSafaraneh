import { Accommodation, ServerAddress } from "@/enum/url";
import { Send } from "@/modules/shared/components/ui/icons";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  text: string;
  isSentByMe: boolean;
  isFromHost: boolean;
  isSeen: boolean;
  creationTime: string;
};

type ChatBoxProps = {
  messages: Message[];
  reserveId: string;
  username: string;
  onMessageSent: () => void;
};

const SEEN_PAGE_SIZE = 25;

function ChatBox({
  messages,
  reserveId,
  username,
  onMessageSent,
}: ChatBoxProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastSeenMessageIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!messages.length) return;

    const unseenHostMessages = messages.filter(
      (m) => m.isFromHost && !m.isSeen
    );

    if (!unseenHostMessages.length) return;

    const lastUnseenId =
      unseenHostMessages[unseenHostMessages.length - 1].id;

    if (lastSeenMessageIdRef.current === lastUnseenId) return;

    const seenCount = messages.filter(
      (m) => m.isFromHost && m.isSeen
    ).length;

    lastSeenMessageIdRef.current = lastUnseenId;

    fetch(
      `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.Seen}`,
      {
        method: "POST",
        headers: {
          accept: "text/plain",
          apikey: process.env.PROJECT_SERVER_APIKEY!,
          tenantId: process.env.PROJECT_SERVER_TENANTID!,
          "accept-language": "fa-IR",
          currency: "EUR",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reserveId,
          username,
          skipCount: seenCount,
          maxResultCount: SEEN_PAGE_SIZE,
        }),
      }
    )
      .then(() => {
        onMessageSent();
      })
      .catch(console.error);
  }, [messages, reserveId, username, onMessageSent]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);

    try {
      const res = await fetch(
        `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.CreateChat}`,
        {
          method: "POST",
          headers: {
            accept: "text/plain",
            apikey: process.env.PROJECT_SERVER_APIKEY!,
            tenantId: process.env.PROJECT_SERVER_TENANTID!,
            "accept-language": "fa-IR",
            currency: "EUR",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            reserveId,
            username,
          }),
        }
      );

      if (!res.ok) throw new Error("Send failed");

      setMessage("");
      onMessageSent();
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-white border rounded-lg border-[#ece9f2] border-4">
      <div className="flex flex-col h-[460px]">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4"
        >
          {messages
            .reduce((groups: any[], msg) => {
              const date = formatDate(msg.creationTime);
              const group = groups.find((g) => g.date === date);
              group
                ? group.items.push(msg)
                : groups.push({ date, items: [msg] });
              return groups;
            }, [])
            .map((group) => (
              <div key={group.date}>
                <div className="flex justify-center my-2">
                  <span className="text-2xs bg-gray-100 text-gray-400 px-2 rounded-full">
                    {group.date}
                  </span>
                </div>

                {group.items.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isSentByMe ? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div
                      className={`px-3 py-1 rounded-lg max-w-[75%] ${
                        msg.isSentByMe
                          ? "bg-[#fbb11c]/50"
                          : "bg-gray-300"
                      }`}
                    >
                      <div className="text-sm">{msg.text}</div>

                      <div className="flex items-center gap-1 text-2xs text-gray-500">
                        <span>{formatTime(msg.creationTime)}</span>

                        {msg.isSentByMe && (
                          <span>
                            {msg.isSeen ? (
                              <span className="text-blue-500">✔✔</span>
                            ) : (
                              <span className="text-gray-400">✔</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className="bg-[#ece9f2] p-2 flex items-center relative">
          <input
            className="w-full text-sm px-3 py-2 rounded-full"
            placeholder="پیام خود را بنویسید..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            disabled={sending}
            className="bg-gray-400 p-2 rounded-full absolute left-3"
          >
            <Send className="w-6 h-6 fill-white rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;