import Image from "next/image";

const Intro : React.FC = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2">
        <Image
            src='/images/del/blog-hero.jpg'
            alt="بلاگ"
            width={750}
            height={750}
            className="w-full h-500 block object-cover"
            onContextMenu={e => e.preventDefault()}
        />

        <div className="bg-gray-50" >
            <div className="max-w-half-container p-10">

                <h2 className="text-xl md:text-6xl leading-normal mb-1" >
                    وبلاگ
                </h2>
                
                <div className="mb-7 text-xs">
                    حرفه ای ترین شبکه معرفی هتل های ایران
                </div>

                <div className="text-sm text-justify mb-5">
                    گردشگری یا توریسم در اصطلاح به معنای سفر به قصد لذت بردن و بازدید از یک مکان غیر از مکان عادی زندگی خود است. گردشگری می‌تواند داخلی (سفر و گردش در داخل کشور خود) و یا بین‌المللی باشد. امروزه حوزه گردشگری یک طیف وسیع از انواع گردشگری را دارد که به بخش‌های مختلفی از نوع و نحوه سفر اشاره می‌کند.
                </div>

            </div>
        </div>
    </div>
    )
}

export default Intro;