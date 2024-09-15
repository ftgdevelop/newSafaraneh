import { useRef, useState } from "react";
import { Close, Search } from "@/modules/shared/components/ui/icons";
import { useRouter } from "next/router";

const SearchTheme2: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const searchHandle = (e:any) => {
        e.preventDefault();
        const textInputVal = inputRef.current?.value;
        if(textInputVal){
            router.push(`/blog/blog-search/${textInputVal}`)
        }
    }

    return (
        <div className="bg-green-700 py-1">
            <div className="max-w-container m-auto px-3">
                <div className="relative flex gap-5 justify-end items-center h-10 sm:h-13">

                    <form
                        className={`relative transition-all duration-500 ${open ? "visible opacity-100 left-0" : "opacity-0 invisible -left-10"}`}
                        onSubmit={searchHandle}
                    >
                        <input
                            className="border border-px border-neutral-300 rounded-full px-5 w-full sm:w-80 h-8 sm:h-10 pr-10 outline-none"
                            type="text"
                            ref={inputRef}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -mt-3"
                        >
                            <Search className="w-6 h-6 fill-current" />
                        </button>
                    </form>

                    <button
                        className="border-none outline-none relative"
                        type="button"
                        onClick={() => {
                            setOpen(prevState => {                                
                                if(!prevState){
                                    setTimeout(()=>{inputRef.current?.focus();}, 100)
                                }
                                return(!prevState);
                            });
                        }}
                    >
                        {open ? (
                            <Close className="w-6 h-6 fill-white" />
                        ) : (
                            <Search className="w-6 h-6 fill-white" />
                        )}

                    </button>

                    <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
                        مجله سفرلایف
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SearchTheme2;