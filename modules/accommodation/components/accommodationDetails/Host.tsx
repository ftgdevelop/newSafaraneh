import Image from "next/image";

type HostProps = {
  host: {
    id: string;
    name: string;
    avatarPath?: string;
  };
};

function Host({ host }: HostProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border my-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
        <Image
          src={host.avatarPath || "/images/default-avatar.png"}
          alt={host.name}
          title={host.name}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{host.name}</h3>
        <p className="text-sm text-gray-500">میزبان شما</p>
      </div>
    </div>
  );
}

export default Host;