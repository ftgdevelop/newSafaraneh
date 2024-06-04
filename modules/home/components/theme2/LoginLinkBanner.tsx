import Button from "@/modules/shared/components/ui/Button"
import { Verified } from "@/modules/shared/components/ui/icons";
import { useAppSelector } from "@/modules/shared/hooks/use-store";

const LoginLinkBanner = () => {
    
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    if (isAuthenticated){
        return null;
    }

    return(
        <div className="bg-blue-950 text-white mb-6 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-5 text-xs md:text-md font-semibold items-center max-sm:mx-5" >
            <p className="flex gap-3 md:items-center">
                <Verified 
                    className="w-10 h-10 fill-current shrink-0"
                />
                10٪ یا بیشتر در بیش از 100000 هتل با قیمت اعضا صرفه جویی کنید. همچنین، با اضافه کردن هتل به پرواز، اعضا تا 30٪ صرفه جویی می کنند
            </p>

            <Button
                href="/register"
                className="h-10 px-5 text-xs whitespace-nowrap"
            >
                ثبت نام
            </Button>
        </div>
    )
}

export default LoginLinkBanner;