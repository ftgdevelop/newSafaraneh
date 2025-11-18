import CheckboxGroup from "@/modules/shared/components/ui/CheckboxGroup";
import { useState } from "react";

const AccommodationTypeFilter: React.FC = () => {
    const [values, setValues] = useState<string[]>([]);

    const options = [
        { value: "1", label: "آپارتمان" },
        { value: "2", label: "مسافرخانه" },
        { value: "3", label: "سوییت" },
    ];

    const resetFilter = () => {
        setValues([]);
    };

    return (
        <>
            <div className="flex justify-between items-start mb-2 mt-4 border-t border-neutral-300 pt-5">
                <label className="mb-1 font-semibold text-sm">
                    نوع اقامتگاه
                </label>
                {!!values.length && (
                    <button
                        onClick={resetFilter}
                        type="button"
                        className="bg-red-500 text-white text-xs leading-5 px-2 rounded inline-block"
                    >
                        حذف
                    </button>
                )}
            </div>
            
            <CheckboxGroup
                items={options}
                onChange={v => { setValues(v) }}
                values={values}
            />
        </>
    );
};

export default AccommodationTypeFilter;