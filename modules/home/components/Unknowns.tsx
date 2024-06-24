
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import { LeftCircle, RightCircle } from '@/modules/shared/components/ui/icons';

const Unknowns: React.FC = () => {
    const { t } = useTranslation('common');
    const { t: tHome } = useTranslation('home');

    const items: {
        imageUrl: string;
        title: string;
        location: string;
        url: string;
    }[] = [
            {
                url: "https://www.instagram.com/p/CHVMUhqAFbV/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-busher-thumb.jpg",
                title: tHome('offer3-desc'),
                location: tHome('offer3')
            },
            {
                url: "https://www.instagram.com/p/CJdreyCASlk/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-hormoz-thumb.jpg",
                title: tHome('offer5-desc'),
                location: tHome('offer5')
            },
            {
                url: "https://www.instagram.com/p/CH2sdAqgK8i/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-lahijan-thumb.jpg",
                title: tHome('offer1-desc'),
                location: tHome('offer1')
            },
            {
                url: "https://www.instagram.com/p/CHksBtmgZbl/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-matinabad-thumb.jpg",
                title: tHome('offer2-desc'),
                location: tHome('offer2')
            },
            {
                url: "https://www.instagram.com/p/CHK5VE2gatE/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-esfahan-thumb.jpg",
                title: tHome('offer4-desc'),
                location: tHome('offer4')
            },
            {
                url: "https://www.instagram.com/p/CKT3qG_gGTF/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-yazd-thumb.jpg",
                title: tHome('offer6-desc'),
                location: tHome('offer6')
            }

        ];


    const settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <RightCircle />,
        prevArrow: <LeftCircle />,
        customPaging: function () {
            return (
                <a className='w-3.5 h-3.5 border-2 border-neutral-500 inline-block rounded-full' />
            );
        },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };



    return (
        <Fragment>
            <h2 className='text-xl font-semibold my-4 md:mt-10'>
                ناشناخته ها
            </h2>

                <Slider {...settings} className='gap-slider'>

                    {items.map(item => (
                        <a key={item.title} href={item.url} className='rtl:rtl block bg-white rounded-lg overflow-hidden' target='_blank' title={item.title}>
                            <div className='relative'>
                                <Image
                                    onContextMenu={e => { e.preventDefault() }}
                                    src={item.imageUrl}
                                    alt={`رزرو ${item.title}`}
                                    width={272}
                                    height={142}
                                    className='w-full h-auto'
                                />
                                <div className='absolute bottom-3 px-5'>
                                    <span className='bg-primary-800 text-white px-5 pt-2 pb-3 inline-block leading-4 text-sm rounded-lg'> {item.location} </span>
                                </div>
                            </div>
                            <div className='p-3'>
                                <h2 className='mb-1 text-sm font-semibold'>
                                    {item.title}
                                </h2>
                                <div className="text-sm text-blue-700 rtl:text-left ltr:text-right">{t('more-details')}</div>
                            </div>

                        </a>
                    ))}

                </Slider>

        </Fragment>

    )
}

export default Unknowns;