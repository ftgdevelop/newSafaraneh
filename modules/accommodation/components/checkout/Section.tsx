import PassengerInfoForm from "./PassengerInfoForm";
import { InfoCircle } from "@/modules/shared/components/ui/icons";

type SectionProps = {
  host: {
    name: string;
    avatar: string;
    description: string;
  };
  onSubmitPassengerInfo: (values: { firstName: string; lastName: string; phoneNumber: string }) => void;
};

function Section({ host, onSubmitPassengerInfo }: SectionProps) {
  if (!host) return null;

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
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
        <div className="flex flex-row items-center gap-2 mt-4 text-gray-500">
          <InfoCircle className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            شماره تماس و آدرس اقامتگاه بعد از پرداخت نمایش داده می‌شود.
          </span>
        </div>
      </div>

      <div className="p-4 bg-white border rounded-lg mt-4">
        <h3 className="text-lg font-bold mb-4">اطلاعات مسافر (رزروگیرنده)</h3>

        <PassengerInfoForm
          onSubmit={(values) => {
            onSubmitPassengerInfo(values); // Pass data to parent
          }}
          submitTrigger={(submitForm) => {
            // Expose submitForm to the parent component
            if (typeof onSubmitTrigger === "function") {
              onSubmitTrigger(submitForm);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Section;
