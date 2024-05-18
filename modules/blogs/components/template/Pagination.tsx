import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pagination: NextPage<any> = ({ perPage, blogs }) => {

    const router = useRouter()
    const page: any = useRouter().query.page || 1
    const routerQuery: any = useRouter().query

    const list: any = []
    useEffect(() => {
        for (let i = 1; i <= +perPage; i++) {
            list.push(i)
        }
        setListPage(list)
        
    }, [])
    const [listPage, setListPage]: any = useState([])
    
    const btnClick = (a: any, b: any) => {
        if (a) router.replace({ query: { ...routerQuery, page: a } })
        else router.replace({ query: { ...routerQuery, page: b } })
    }
    return (
        <>
        {blogs?.length ?
        <ul className="flex flex-wrap select-none justify-center rounded mt-4 max-sm:m-4 p-3 max-sm:p-1 max-sm:pt-3 max-sm:pb-3 max-md:gap-8 max-sm:gap-3 gap-10" style={{ border: 'solid 1px rgba(0,0,0,.2)' }}>
            
            <li
                className={`${+page == listPage[0] && 'hidden'} cursor-pointer w-7 text-center bg-gray-200 hover:bg-gray-300 duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +page - 1)} >
                <ArrowRight className="w-full p-1 ltr:hidden" /> <ArrowLeft className="w-full p-1 rtl:hidden" />
            </li>
    
            <li
                className={`${+page - listPage[0] <= 2 && 'hidden'} cursor-pointer pl-2 pr-2 hover:bg-gray-200 rounded duration-300`}
                onClick={() => btnClick(listPage[0], false)}>{listPage[0]}
            </li>

            
            <li className={`${+page - listPage[0] <= 2 && 'hidden'} text-gray-400`}>...</li>

            
            <li
                className={` ${!listPage.includes(+page - 2) && 'hidden'} cursor-pointer  pl-2 pr-2 scale-90 max-sm:scalse-100 hover:bg-gray-200 rounded duration-300`}
                onClick={() => btnClick(+page - 2, false)} >{+page - 2}
            </li>
            <li
                className={` ${!listPage.includes(+page - 1) && 'hidden'} cursor-pointer  pl-2 pr-2 scale-110 max-sm:scale-100 hover:bg-gray-200 rounded duration-300`}
                onClick={() => btnClick(+page - 1, false)}>{+page - 1}
            </li>

            
            <li
                className={`cursor-pointer bg-blue-600 pl-3 pr-3 max-sm:pr-2 max-sm:pl-2 scale-125 max-sm:scale-100 rounded-sm text-white hover:bg-blue-200 duration-500`}
                onClick={() => btnClick(+page, false)}>{+page}
            </li>

            
            <li
                className={` ${!listPage.includes(+page + 1) && 'hidden'} cursor-pointer pl-2 pr-2 scale-110 hover:bg-gray-200 max-sm:scale-100 rounded duration-300`}
                onClick={() => btnClick(+page + 1, false)}>{+page + 1}
            </li>
            <li
                className={` ${!listPage.includes(+page + 2) && 'hidden'} cursor-pointer pl-2 pr-2 scale-90 max-sm:scale-100 hover:bg-gray-200 rounded duration-300`}
                onClick={() => btnClick(+page + 2, false)}>{+page + 2}
            </li>

            
            <li className={`${+page + 2 >= listPage[+listPage.length - 1] && 'hidden'} text-gray-400`}>...</li>

            
            <li className={` ${+page + 2 >= listPage[+listPage.length - 1] && 'hidden'} cursor-pointer  pl-2 pr-2 hover:bg-gray-200 rounded duration-300`}
                onClick={() => btnClick(listPage[+listPage.length - 1], false)}>
                {listPage[+listPage.length - 1]}
            </li>

            
            <li
                className={` ${+page == listPage[+listPage.length - 1] && 'hidden'} cursor-pointer  bg-gray-200 w-7 text-center hover:bg-gray-300 duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +page + 1)} >
                <ArrowLeft className="w-full p-1 ltr:hidden" /> <ArrowRight className="w-full p-1 rtl:hidden" />
            </li>
            
            </ul>
            : null}
        </>    
    )
}

export default Pagination;