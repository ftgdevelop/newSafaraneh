import { NextPage } from "next";
import Carousel from 'react-multi-carousel';
import Image from "next/image";
import { CityItemType } from "../../types/blog";
import Link from "next/link";

//carousel responsive
const responsive = {
    desktop: {
        breakpoint: { max: 5000, min: 992 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 992, min: 460 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1
    }
};

interface Props {
    data? : CityItemType[]
}


const BlogCities: NextPage<Props> = ({data}) => {
    
    
    return (
        <div className="text-black">
            <div className="text-center pt-24 relative bottom-7 max-sm:bottom-0">
                <h1 className="font-bold text-4xl p-5">وبلاگ</h1>
                <p>حرفه ای ترین شبکه معرفی هتل های ایران</p>
            </div>

            <div className='pl-5 pr-5 max-lg:p-12 max-sm:p-16 m-auto max-w-screen-xl'>

            <Carousel
                className='home-carousel'
                rtl
                responsive={responsive}
                renderDotsOutside
                showDots
            >
            {
                data ?
                data.map(city => 
                    <div className="p-2" key={city.title.rendered}>
                        <Link href={city.excerpt.rendered.slice(3,city.excerpt.rendered.length - 5)} target="_blank">
                        <Image src={city.images.medium} alt="pic" width={400} height={250} className="object-fit rounded-md"/>
                        <p className="bg-white max-w-20 p-4 text-center rounded-lg relative bottom-18 ml-3 mr-3 m-auto text-xl">{city.title.rendered}</p>
                        </Link>    
                    </div>
                ):<p></p>

            }
            </Carousel>

            </div>
        </div>
    )
}

export default BlogCities;