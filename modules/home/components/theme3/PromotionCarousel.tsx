import { LeftCaret, RightCaret } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Slider from "react-slick";

type Props = {
    wrapperClassName?: string;
    items: {
        imageUrl: string;
        title: string;
        subtitle: ReactNode;
        icon?: string;
        url: string;
    }[]
}
const PromotionCarousel: React.FC<Props> = props => {

    const settings = {
        speed: 500,
        slidesToShow: 1,
        infinite: true,
        slidesToScroll: 1,
        nextArrow: <RightCaret />,
        prevArrow: <LeftCaret />
    };

    return (
        <div className={props.wrapperClassName || ""}>

            <Slider
                {...settings}
                className="promotion-carousel"
            >

                {props.items.map(item => (
                    <Link
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        className="block relative rounded-2xl overflow-hidden"
                        dir="rtl"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={580}
                            height={300}
                            className="w-full h-48 lg:h-72 object-cover"
                        />
                        <div className={`absolute top-0 right-0 bottom-0 w-2/3 flex flex-col justify-between text-white p-3 lg:p-5 lg:pt-10`} >
                            <div>
                                <h2 className="lg:text-lg mb-2"> {item.title} </h2>
                                {item.subtitle}
                            </div>

                            {item.icon && <Image
                                src={item.icon}
                                alt={item.title}
                                width={100}
                                height={64}
                                className="bg-white rounded-lg w-16 h-auto"
                            />}
                        </div>
                    </Link>
                ))}

            </Slider>
        </div>
    )
}

export default PromotionCarousel;