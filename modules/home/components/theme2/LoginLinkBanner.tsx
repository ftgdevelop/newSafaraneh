import Button from "@/modules/shared/components/ui/Button"
import { Verified } from "@/modules/shared/components/ui/icons";
import { useAppSelector } from "@/modules/shared/hooks/use-store";

const LoginLinkBanner = () => {
    
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    if (isAuthenticated){
        return null;
    }

    return(
        <div className="bg-blue-950 text-white mb-6 rounded-2xl p-5 flex justify-between gap-5 text-md font-semibold items-center" >
            <p className="flex gap-2 items-center">
                <Verified 
                    className="w-12 h-12 fill-current"
                />
                10٪ یا بیشتر در بیش از 100000 هتل با قیمت اعضا صرفه جویی کنید. همچنین، با اضافه کردن هتل به پرواز، اعضا تا 30٪ صرفه جویی می کنند
            </p>

            <Button
                href="/register"
                className="h-10 px-5 text-xs"
            >
                ثبت نام
            </Button>
        </div>
    )
}

export default LoginLinkBanner;