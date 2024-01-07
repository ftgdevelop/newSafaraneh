import { NextPage } from "next";
import Carousel from 'react-multi-carousel';
import Image from "next/image";
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

//citys blog
const citys: {
    name: string,
    image: string
}[] = [
        {
            name: 'تهران',
            image: 'https://panel.safaraneh.com/wp-content/uploads/2021/01/tehran.jpg'
        },
        {
            name: 'شیراز',
            image: 'https://panel.safaraneh.com/wp-content/uploads/2021/01/shiraz.jpg'
        },
        {
            name: 'اصفهان',
            image: 'https://panel.safaraneh.com/wp-content/uploads/2021/01/esfahan.jpg'
        },
        {
            name: 'مشهد',
            image: 'https://panel.safaraneh.com/wp-content/uploads/2021/01/mashhad.jpg'
        },
        {
            name: 'کیش',
            image: 'https://panel.safaraneh.com/wp-content/uploads/2021/01/kish.jpg'
        }
]


const MainBlog: NextPage<any> = () => {


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
                citys.map(city => 
                    <div className="p-2">
                        <Image src={city.image} alt="pic" width={400} height={250} className="object-fit rounded-md"/>
                        <p className="bg-white max-w-20 p-4 text-center rounded-lg relative bottom-18 ml-3 mr-3 m-auto text-xl">{city.name}</p>
                    </div>
                )
            }  
            </Carousel>
                
            </div>
        </div>
    )
}

export default MainBlog;