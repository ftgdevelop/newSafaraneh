import { Close, ImageGallery } from '@/modules/shared/components/ui/icons';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setBodyScrollable } from '@/modules/shared/store/stylesSlice';
import ModalPortal from '@/modules/shared/components/ui/ModalPortal';
import GalleryLevel2 from './GalleryLevel2';

type Props = {
    images?: {
        src: string;
        alt: string;
        width: number;
        height: number;
        description: string;
        thumbnail: string;
    }[];
    hotelName?:string;
}

const GalleryLevel1: React.FC<Props> = props => {

    const dispatch = useAppDispatch();

    const { t: tHotel } = useTranslation('hotel');
    const { images } = props;

    const theme2 = process.env.THEME === "THEME2";

    const [open, setOpen] = useState<boolean>(false);
    const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setTimeout(() => { setDelayedOpen(true) }, 50);
            dispatch(setBodyScrollable(false));
        } else {
            dispatch(setBodyScrollable(true));
        }
    }, [open]);

    useEffect(() => {
        if (!delayedOpen) {
            setTimeout(() => {setOpen(false)}, 300);
        }
    }, [delayedOpen]);

    useEffect(()=>{
        return(()=>{
              dispatch(setBodyScrollable(true));
        })
    },[]);



    if (!images?.length) {
        return null
    }

    return (
        <>
            <div id="pictures_section" className={`grid grid-cols-1 md:grid-cols-4 bg-white relative ${theme2?"":"gap-1"}`}>
                {images.slice(0, 5).map((slide, index) => (
                    <Image
                        key={slide.thumbnail}
                        priority={!index}
                        onContextMenu={(e)=> e.preventDefault()}
                        src={slide.thumbnail}
                        title={slide.description || slide.alt || ""}
                        alt={slide.alt || props.hotelName || slide.description || ""}
                        aria-description={slide.description || slide.alt || ""}
                        width={index ? 287 : 384}
                        height={index ? 191 : 288}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        onClick={() => { setOpen(true) }}
                        className={`cursor-pointer w-full object-cover ${theme2?"p-px":""} ${theme2 ?index ? "h-40" :"h-80":"h-full"} ${index ? "hidden md:block md:col-span-1 md:row-span-1" : "md:col-span-2 md:row-span-2"}`}
                    />
                ))}

                <span className='text-xs absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/75 text-white px-5 py-2 rounded-lg pointer-events-none flex gap-2 items-center'>
                    <ImageGallery className='w-6 h-6 fill-current' />
                    +{images.length} {!theme2 && tHotel("picture")}
                </span>

            </div>

            <ModalPortal
                show={open}
                selector='modal_portal'
            >

                <div className={`fixed h-screen top-0 left-screen bg-white w-screen pb-5 duration-200 transition-all ${delayedOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                    <header className='flex py-4 px-5 border-b gap-2 items-center justify-between'>
                        گالری تصاویر هتل
                        <button type='button' onClick={()=>{setDelayedOpen(false)}}> 
                            <Close className='w-7 h-7 fill-current' /> 
                        </button>
                    </header>
                    <GalleryLevel2 hotelName={props.hotelName} images={props.images} />
                </div>

            </ModalPortal>
        </>
    )
}

export default GalleryLevel1;