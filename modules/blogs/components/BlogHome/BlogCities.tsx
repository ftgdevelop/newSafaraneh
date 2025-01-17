import { NextPage } from "next";
import Image from "next/image";
import { CityItemType } from "../../types/blog";
import Link from "next/link";
import Slider from "react-slick";
import { LeftCircle, RightCircle } from "@/modules/shared/components/ui/icons";



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

interface Props {
    cities? : CityItemType[]
}


const BlogCities: NextPage<Props> = (props) => {
    
    const {cities} = props;

    const items = cities?.map((city ,index) => 
        <Link 
            key={city.title?.rendered}
            href={city.excerpt?.rendered?.slice(3, city.excerpt.rendered.length - 5)}
            target="_blank"
            className="max-sm:relative max-sm:top-9 rtl:rtl" 
        >
            <div className="p-2">
                <Image 
                    src={city.images?.medium} 
                    alt={city.title?.rendered} 
                    width={397} 
                    height={266}
                    className="object-fit rounded-md w-full" 
                    priority={!index} 
                />
                <p className="bg-white p-4 text-center rounded-lg relative bottom-18 ml-3 mr-3 m-auto text-xl">{city.title?.rendered}</p> 
            </div>
        </Link>
    );
    
    return (
        <div className="text-black">
            <div className="text-center pt-14 p-5 max-md:pt-10">
                <h1 className="font-bold text-4xl p-5">وبلاگ</h1>
                <p className="max-sm:text-sm max-sm:text-gray-600">حرفه ای ترین شبکه معرفی هتل های ایران</p>
            </div>

            <div className='max-xl:p-3 m-auto max-w-container'>

                {!!items?.length && <Slider {...settings}>
                    {items}
                </Slider>}

            </div>
        </div>
    )
}

export default BlogCities;