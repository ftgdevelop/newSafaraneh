import { ImageGallery } from '@/modules/shared/components/ui/icons';
import { DomesticHotelDetailType } from '@/modules/domesticHotel/types/hotel';
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
    images?: DomesticHotelDetailType['Gallery']
}

const Gallery: React.FC<Props> = props => {

    const { t: tHotel } = useTranslation('hotel');
    const { images } = props;

    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    if (!images) {
        return <div>
            no image message...
        </div>
    }

    const slides = images.filter(item => item.Image).map(item => ({
        src: item.Image! as string,
        alt: item.Title || "",
        width: 1000,
        height: 700,
        description: item.Alt
    }));

    const openLightBox = (index?: number) => {
        setSlideIndex(index || 0);
        setOpen(true);
    }

    return (
        <>
            <div id="pictures_section" className='grid grid-cols-1 md:grid-cols-4 gap-1 bg-white relative'>
                {slides.slice(0, 5).map((slide, index) => (
                    <Image
                        key={slide.src}
                        priority={!index}
                        onContextMenu={(e)=> e.preventDefault()}
                        src={slide.src}
                        alt={slide.alt}
                        sizes={index?"(max-width: 768px) 100vh, 578px" : "(max-width: 768px) 100vh, 287"}
                        width={index ? 287 : 430}
                        height={index ? 191 : 270}
                        onClick={() => { openLightBox(index); }}
                        className={`cursor-pointer w-full h-full object-cover ${index ? "hidden md:block md:col-span-1 md:row-span-1" : "md:col-span-2 md:row-span-2"}`}
                    />
                ))}

                <span className='text-xs absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/75 text-white px-5 py-2 rounded-lg pointer-events-none flex gap-2 items-center'>
                    <ImageGallery className='w-6 h-6 fill-current' />
                    +{slides.length} {tHotel("picture")}
                </span>

            </div>

            <Lightbox
                index={slideIndex}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                plugins={[Thumbnails, Captions]}
                captions={{ descriptionTextAlign: 'center' }}
                thumbnails={{ width: 80, height: 50 }}
            />

        </>
    )
}

export default Gallery;