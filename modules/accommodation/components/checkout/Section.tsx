import PassengerInfoForm from "./PassengerInfoForm";
import { Chat, InfoCircle } from "@/modules/shared/components/ui/icons";
import Link from "next/link";

type SectionProps = {
  host: {
    name: string;
    avatar: string;
    description: string;
  };
  onSubmitPassengerInfo: (values: { firstName: string; lastName: string; phoneNumber: string }) => void;
};

function Section({ host, onSubmitPassengerInfo, onSubmitTrigger }: SectionProps & { onSubmitTrigger?: (submitForm: () => void) => void }) {
  if (!host) {
    return (
      <div>
        <div className="p-4 bg-white border rounded-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
            <div>
              <div className="w-20 h-3 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="max-sm:mt-4 max-sm:flex max-sm:justify-end">
              <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg mt-4">
          <div className="w-40 h-5 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end p-4 bg-white border rounded-lg">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <small className="text-gray-400">میزبان شما</small>
              <h4 className="text-md font-bold">{host.name}</h4>
              <p className="text-sm text-gray-500">{host.description}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-gray-500 leading-5">
            <InfoCircle className="w-4 h-4 text-gray-400" />
            <span className="text-2xs sm:text-xs text-gray-500">
              شماره تماس و آدرس اقامتگاه بعد از پرداخت نمایش داده می‌شود.
            </span>
          </div>
        </div>
        {/* <div className="flex justify-end">
          <Link className="bg-gray-100 hover:bg-gray-50 transition text-[#412690] flex flex-row items-center gap-2 px-3 py-1 rounded-full mt-4" href="/contact-host">
            <Chat className="w-4 h-4 fill-transparent" />
            <span className="text-xs">چت با میزبان</span>
          </Link>
        </div> */}
      </div>

      <div className="p-4 bg-white border rounded-lg mt-4">
        <h3 className="text-lg font-bold mb-4">اطلاعات مسافر (رزروگیرنده)</h3>

        <PassengerInfoForm
          onSubmit={onSubmitPassengerInfo}
          submitTrigger={onSubmitTrigger}
        />
      </div>
    </div>
  );
}

export default Section;
