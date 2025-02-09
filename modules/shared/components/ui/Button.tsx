import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../../hooks/use-store';
import { setProgressLoading } from '../../store/stylesSlice';

type Props = {
    onClick?:()=>void;
    loading?:boolean;
    disabled?:boolean;
    className?:string;
    type?:"submit" | "button";
    href?:string;
    target?: "_blank";
    color?:"red" | "blue" | 'green'|'gray' | "primary" | "yellow";
    hasArrow?: boolean;
    prefetch?: boolean;
}


const Button: React.FC<PropsWithChildren<Props>> = props => {
    
    const dispatch = useAppDispatch();

    const {color} = props;

    const theme2 = process.env.THEME === "THEME2";

    let className = `transition-all ${theme2? "rounded-full":"rounded-lg"} flex gap-3 items-center justify-center cursor-pointer select-none relative ${props.className}`;

    if(props.disabled){
        className += " text-white bg-neutral-200";
    }else if (!color || color === 'primary'){
        className += " text-white bg-primary-600 hover:bg-primary-800";
    }else if (color === 'blue'){
        className += " text-white bg-blue-700 hover:bg-blue-800";
    }else if(color === 'green'){
        className += " text-white bg-green-800 hover:bg-green-700";
    }else if (color === 'gray'){
        className += " bg-neutral-100 hover:bg-neutral-200";
    }else if (color === 'yellow'){
        className += " bg-[#fdab05] hover:bg-[#fdba37]";
    }else{
        className += " text-white bg-red-600 hover:bg-red-700";
    }

    const arrow = (!props.loading && props.hasArrow) ? (
        <span 
            className='w-2.5 h-2.5 background-red-400 inline-block rotate-45 absolute rtl:border-b-2 rtl:border-l-2 rtl:left-3 ltr:right-3 ltr:border-t-2 ltr:border-r-2 top-1/2 -translate-y-1/2' 
        />
    ) : null;

    if (props.href){
        return <Link 
            href={props.href} 
            target={props.target} 
            className={className}
            prefetch={props.prefetch || false}
            onClick={() => {dispatch(setProgressLoading(true))}}
        >
            {props.children}
            {arrow}
        </Link>
    }

    return(
        <button type={props.type || "button"} className={className} onClick={props.onClick}>
            {props.children}
            {props.loading ? <span className="animate-spin block border-2 border-white rounded-full border-r-transparent border-t-transparent w-5 h-5" /> : null}
            {arrow}
        </button>
    )

};

export default Button;