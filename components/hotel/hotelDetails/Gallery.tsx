import { ImageGallery } from '@/components/shared/ui/icons';
import { DomesticHotelDetailType } from '@/types/hotel';
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

    const { t } = useTranslation('common');
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
        description:item.Alt
    }));

    const openLightBox = (index?: number) => {
        setSlideIndex(index || 0);
        setOpen(true);
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-1 bg-white relative'>
                {slides.slice(0, 5).map((slide, index) => (
                    <Image
                        key={slide.src}
                        priority={!index}
                        src={slide.src}
                        alt={slide.alt}
                        width={index ? 287 : 578}
                        height={index ? 191 : 386}
                        onClick={() => { openLightBox(index); }}
                        className={`cursor-pointer w-full h-full object-cover ${index ? "hidden md:block md:col-span-1 md:row-span-1" : "md:col-span-2 md:row-span-2"}`}
                    />
                ))}

                <span className='text-xs absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/75 text-white px-5 py-2 rounded-lg pointer-events-none flex gap-2 items-center'>
                    <ImageGallery className='w-6 h-6 fill-current' />
                    +{slides.length} {t("picture")}
                </span>

            </div>

            <Lightbox
                index={slideIndex}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                plugins={[Thumbnails,Captions]}
                captions={{descriptionTextAlign:'center'}}
                thumbnails={{width:80,height:50}}
            />

        </div>
    )
}

export default Gallery;