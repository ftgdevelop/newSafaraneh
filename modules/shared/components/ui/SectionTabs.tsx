import { useEffect, useRef, useState } from 'react';
import SectionTabItem from './SectionTabItem';

type Props ={
    items: {id:string, title:string}[];
}

const SectionTabs: React.FC<Props> = props => {

    const [sticky, setSticky] = useState<boolean>(false);

    const theme2 = process.env.THEME === "THEME2";

    const wrapperRef = useRef<HTMLDivElement>(null);

    const {items} = props;

    const makeSticky = () => {
        const wrapperTop = wrapperRef.current?.getBoundingClientRect().top;
        if (!wrapperTop) return;
        if (wrapperTop > 0) {
            setSticky(false);
        } else {
            setSticky(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', makeSticky);
        window.addEventListener("resize", makeSticky);

        return (() => {
            document.removeEventListener('scroll', makeSticky);
            window.removeEventListener("resize", makeSticky);
        });
    }, []);

    return (<div ref={wrapperRef} className='relative border-4 border-[#ece9f2] rounded-2xl'>
        <div className={`transition-all ${sticky ? "fixed z-[1001] left-0 right-0 top-0 bg-white shadow" :""}`}>
            <div className='max-w-container mx-auto px-2 sm:px-3'>
                <div className={`${(theme2 && !sticky) ?"bg-white":""}`}>
                    <nav className='flex gap-y-1 overflow-auto whitespace-nowrap'>
                        {items.map(item => <SectionTabItem key={item.id} title={item.title} target={item.id} />)}
                    </nav>
                </div>
            </div>
        </div>
    </div>)
}

export default SectionTabs;