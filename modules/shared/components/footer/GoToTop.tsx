import { ArrowLeft } from "../ui/icons";
import { useState, useEffect } from 'react';

const GoToTop: React.FC = () => {

    const [showBtn, setShowBtn] = useState<boolean>(false);

    const checkScroll = () => {
        if (document) {
            const top = document.documentElement.scrollTop;
            if (top > 700) {
                setShowBtn(true);
            }
            else {
                setShowBtn(false);
            }
        }
    }

    useEffect(() => {

        document.addEventListener('scroll', checkScroll);
        window.addEventListener("resize", checkScroll);

        return (() => {
            document.removeEventListener('scroll', checkScroll);
            window.removeEventListener("resize", checkScroll);
        });

    }, []);

    return (
        <button
            type="button"
            className={`${showBtn ? "visible opacity-100" : "invisible opacity-0"} bg-blue-800 hover:bg-blue-700 transition-all z-20 fixed bottom-3 rtl:left-3 ltr:right-3 md:bottom-10 md:rtl:left-10 md:ltr:right-10 rounded-full p-3 cursor-pointer`}
            onClick={() => {
                if (window) {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }}
        >
            <ArrowLeft className="w-6 h-6 fill-white rotate-90" />

        </button>
    )
}

export default GoToTop;