import { openLoginForm } from "@/modules/authentication/store/authenticationSlice";
import Button from "@/modules/shared/components/ui/Button"
import { Verified } from "@/modules/shared/components/ui/icons";
import { useAppDispatch, useAppSelector } from "@/modules/shared/hooks/use-store";

type Props = {
    message:string;
}
const LoginLinkBanner:React.FC<Props> = props => {
    
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

    const dispatch = useAppDispatch();

    if (isAuthenticated){
        return null;
    }

    return(
        <div className="bg-blue-950 text-white mb-6 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row justify-between gap-5 text-xs md:text-md font-semibold items-center max-sm:mx-5" >
            <p className="max-sm:text-center flex gap-3 md:items-center">
                <Verified 
                    className="w-10 h-10 fill-current shrink-0 hidden sm:block"
                />
                {props.message}
            </p>

            <Button
                type="button"
                className="h-10 px-5 text-xs whitespace-nowrap"
                onClick={()=>{dispatch(openLoginForm())}}
            >
                وارد شوید
            </Button>
        </div>
    )
}

export default LoginLinkBanner;