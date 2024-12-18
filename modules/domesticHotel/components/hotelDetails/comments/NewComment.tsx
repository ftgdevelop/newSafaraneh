import Button from "@/modules/shared/components/ui/Button";
import { useAppSelector } from "@/modules/shared/hooks/use-store";
import { useState } from "react";
import CommentForm from "./CommentForm";

type Props = {
    pageId: number;
    onRefreshComments: () => void;
}

const NewComment: React.FC<Props> = props => {

    const userAuthentication = useAppSelector(state => state.authentication);
    const isAuthenticated = userAuthentication?.isAuthenticated;

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                type='button'
                color='blue'
                className='h-10 px-2 text-sm'
                onClick={() => { setOpen(true) }}
            >
                {isAuthenticated ? "ثبت نظر" : "ورود و ثبت نظر"}

            </Button>

            {open && <CommentForm pageId={props.pageId} onRefreshComments={props.onRefreshComments} closeHandle={() => { setOpen(false) }} />}

        </>
    )
}
export default NewComment;