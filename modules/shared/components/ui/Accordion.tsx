import { useEffect, useRef, useState } from "react";

type Props = {
    content: React.ReactNode;
    title: React.ReactNode;
    WrapperClassName?: string;
    initiallyOpen?:boolean;
    updateContent?:string;
    type?: 2 | 3;
}

const Accordion: React.FC<Props> = props => {

    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(props.initiallyOpen || false);

    const {content, title} = props;

    const toggle = () => { setOpen(prevState => !prevState) }

    useEffect(() => {
        if (open) {
            contentRef.current!.style.maxHeight = contentRef.current!.scrollHeight + "px";
        } else {
            contentRef.current!.style.maxHeight = "0";
        }
    }, [open, props.updateContent]);

    const type2 = props.type === 2;
    const type3 = props.type === 3;

    let wrapperClassName = `text-sm sm:text-base text-neutral-700 ${props.WrapperClassName} `; 
    if(type3){
        wrapperClassName += ` transiton-all ${open?"bg-neutral-100":"bg-white"}`
    }else if(type2){

    }else{
        wrapperClassName += ` border border-neutral-200 rounded-lg`
    }

    return (
        <div className={wrapperClassName}>
            {type2 ? (
                <div onClick={toggle} className={`py-1 relative select-none cursor-pointer after:block after:w-2 after:h-2 after:border-b-2 after:border-l-2 after:top-1/2 after:-mt-1 after:border-neutral-400 after:self-center after:transition-all after:absolute after:rtl:right-0 after:ltr:left-0 rtl:pr-4 ltr:pl-4 ${open?"after:rotate-135":"after:-rotate-45"}`}>
                {title}
                </div>
            ):(
            <div onClick={toggle} className={`leading-4 relative select-none cursor-pointer p-3 sm:p-4 after:block after:w-2 after:h-2 after:border-b-2 after:border-l-2 after:top-1/2 after:-mt-1 after:border-neutral-400 after:self-center after:transition-all after:absolute after:rtl:left-5 after:ltr:right-5 rtl:pl-12 ltr:pr-12 ${open?"after:rotate-135":"after:-rotate-45"}`}>
                {title}
            </div>
            )}
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300"
            >
                <div className={`${type3? "px-3 sm:px-5 text-justify pb-5": type2?"rtl:pr-5 ltr:pl-5 ":"bg-neutral-100 p-3 m-3 sm:p-5 sm:m-5 mt-0 sm:mt-0 text-justify"}`}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Accordion;