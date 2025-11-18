import { Search } from "@/modules/shared/components/ui/icons";

const AccommodationNameFilter: React.FC = () => {

    return (
        <>
            <div className="flex justify-between items-start">
                <label className="mb-1 font-semibold text-sm">
                    نام اقامتگاه
                </label>
                <button
                    type="button"
                    className="bg-red-500 text-white text-xs leading-5 px-2 rounded inline-block"
                >
                    حذف
                </button>
            </div>
            <div className='relative'>
                <input
                    className="border border-neutral-300 rounded px-3 text-sm h-10 block w-full rtl:pl-14 ltr:pr-14 outline-none focus:border-neutral-600"
                    type="text"
                    placeholder="جستجوی نام اقامتگاه"
                    name="accommodationName"
                    // onChange={}
                    // value={}
                    // onKeyDown={}
                />

                <button
                    // onClick={}
                    type="button"
                    aria-label="filter hotel name"
                    className={`absolute rtl:left-1 ltr:right-1 top-1 bottom-1 aspect-square flex justify-center items-center`}
                >
                    <Search className="w-7 h-7 fill-current" />
                </button>
            </div>
        </>
    )
}

export default AccommodationNameFilter;