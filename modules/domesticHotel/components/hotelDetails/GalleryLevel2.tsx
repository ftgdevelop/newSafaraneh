import { ImageGallery } from '@/modules/shared/components/ui/icons';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

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

const GalleryLevel2: React.FC<Props> = props => {

    const { t: tHotel } = useTranslation('hotel');
    const { images } = props;

    const theme2 = process.env.THEME === "THEME2";

    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    if (!images?.length) {
        return null
    }

    const openLightBox = (index?: number) => {
        setSlideIndex(index || 0);
        setOpen(true);
    }

    if (!images.length){
        return(
            null
        )
    }

    return (
        <div className='p-5 h-calc-gallery2'>
            <div className={`max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 relative ${theme2?"":"gap-1"}`}>
                {images.map((slide, index) => {
                    
                    let xClass = "";
                    let width=287;
                    let height=191; 
                    switch(index%6){
                        case 0:
                            xClass= "md:col-span-2 md:row-span-2 h-full";
                            width=384;
                            height=288;
                            break;
                        
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            xClass= "md:col-span-1 md:row-span-1 h-40";
                            break;
                        
                        case 5:
                            xClass= "md:col-span-4 md:row-span-2 h-80";
                            width=768;
                            height=320;
                            break;
                        default :
                        xClass = ""                        
                    }

                    return (
                        <Image
                            key={slide.thumbnail}
                            onContextMenu={(e)=> e.preventDefault()}
                            src={slide.thumbnail}
                            title={slide.description || slide.alt || ""}
                            alt={slide.alt || props.hotelName || slide.description || ""}
                            aria-description={slide.description || slide.alt || ""}
                            width={width}
                            height={height}
                            sizes="(max-width: 767px) 100vw, 50vw"
                            onClick={() => { openLightBox(index); }}
                            className={`cursor-pointer w-full object-cover ${theme2?"p-px":""} ${xClass}`}
                        />
                    )
                })}

            </div>

            <Lightbox
                index={slideIndex}
                open={open}
                close={() => setOpen(false)}
                slides={images}
                plugins={theme2 ? [Captions] : [Thumbnails, Captions]}
                captions={{ descriptionTextAlign: 'center' }}
                thumbnails={{ width: 80, height: 50 }}
            />

        </div>
    )
}

export default GalleryLevel2;