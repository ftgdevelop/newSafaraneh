import Image from "next/image";
import { useState, useEffect } from "react";

type HostProps = {
  host: {
    id: string;
    name: string;
    avatarPath?: string;
  };
};

function HostInfo({ host }: HostProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border my-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border my-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
        <Image
          src={host?.avatarPath || "/images/default-avatar.png"}
          alt={host?.name}
          title={host?.name}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{host?.name}</h3>
        <span className="text-2xs text-gray-500">نمایش اطلاعات تماس میزبان پس از پرداخت</span>
      </div>
    </div>
  );
}

export default HostInfo;