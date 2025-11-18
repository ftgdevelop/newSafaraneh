import Select from "@/modules/shared/components/ui/Select";
import { useState } from "react";

const AccommodationPriceFilter: React.FC = () => {
    const [min, setMin] = useState<string>("");
    const [max, setMax] = useState<string>("");

    const resetFilter = () => {
        setMin("");
        setMax("");
    };

    const options = [
        1000000, 5000000, 10000000, 20000000, 50000000, 100000000
    ];

    return (
        <>
            <div className="flex justify-between items-start mb-2 mt-4 border-t border-neutral-300 pt-5">
                <label className="mb-1 font-semibold text-sm">
                    قیمت کل مدت اقامت (ریال)
                </label>
                {(!!min || !!max) && (
                    <button
                        onClick={resetFilter}
                        type="button"
                        className="bg-red-500 text-white text-xs leading-5 px-2 rounded inline-block"
                    >
                        حذف
                    </button>
                )}
            </div>

            <div className="grid gap-3 grid-cols-3 mb-3">
                <label className="block text-xs"> حداقل </label>
                <Select
                    items={options.map(item => ({ label: item.toLocaleString() + " ریال", value: item.toString() }))}
                    value={min}
                    placeholder="حداقل"
                    wrapperClassName="col-span-2"
                    onChange={v => { setMin(v) }}
                    className="border border-neutral-300 rounded px-3 h-8 outline-none focus:border-neutral-600 block text-xs"
                />
            </div>

            <div className="grid gap-3 grid-cols-3 mb-3">
                <label className="block text-xs"> حداکثر </label>
                <Select
                    items={options.map(item => ({ label: item.toLocaleString() + " ریال", value: item.toString() }))}
                    value={max}
                    wrapperClassName="col-span-2"
                    onChange={v => { setMax(v) }}
                    placeholder="حداکثر"
                    className="border border-neutral-300 rounded px-3 h-8 outline-none focus:border-neutral-600 block text-xs"
                />
            </div>
        </>
    );
};

export default AccommodationPriceFilter;