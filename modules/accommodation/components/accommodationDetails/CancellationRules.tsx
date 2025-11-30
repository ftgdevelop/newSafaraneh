import { useEffect, useState } from "react";
import { ServerAddress, Accommodation } from "@/enum/url";

function CancellationRules({ id }: { id: number }) {
  const [rules, setRules] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCancellationRules = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${ServerAddress.Type}${ServerAddress.Accommodation_Data}${Accommodation.CancellationRules}`,
          {
            method: "POST",
            headers: {
              accept: "text/plain",
              tenantId: id.toString(),
              apikey: "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
              "accept-language": "fa-IR",
              currency: "EUR",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );

        const data = await response.json();
        setRules(data.result || null);
      } catch (error) {
        console.error("Error fetching cancellation rules:", error);
        setRules(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCancellationRules();
  }, [id]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">قوانین لغو</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : rules ? (
        <pre className="text-sm text-gray-700">{JSON.stringify(rules, null, 2)}</pre>
      ) : (
        <p className="text-red-500">قوانین لغو یافت نشد.</p>
      )}
    </div>
  );
}

export default CancellationRules;