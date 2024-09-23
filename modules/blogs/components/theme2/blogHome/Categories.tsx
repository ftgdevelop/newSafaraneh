import Image from 'next/image';
import Link from 'next/link';

type Props = {
    categories?: {
        title:string;
        imageUrl: string;
        id: number
    }[];
}

const Categories: React.FC<Props> = props => {

    if (!props.categories?.length) {
        return null
    }

    return (
        <section className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-12" >

            <h2 className='text-xl md:text-2xl font-semibold my-6 md:my-14 text-center'> دسته بندی های محبوب</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 pb-10'>

                {props.categories?.sort((b,a) => b.id - a.id)?.map((cat, index) => (

                    <Link key={cat.id} href={`/blog/category/${cat.id}`} title={cat.title} className={`relative sm:col-span-${index === 2 ? "2" : "1"}  lg:col-span-${index < 2 ? "3" : "2"}`}>
                        <Image
                            onContextMenu={e => { e.preventDefault() }}
                            src={cat.imageUrl}
                            alt={cat.title}
                            title={cat.title}
                            width={index > 1 ? 387 : 590}
                            height={index > 1 ? 245 : 374}
                            className={`w-full rounded-2xl mb-2 block object-cover h-52 ${index > 1 ? "" : "lg:h-80"}`}
                        />
                        <h3 className='font-semibold text-md absolute top-5 right-5 bg-black/90 text-white px-3 rounded-full'>{cat.title}</h3>
                    </Link>
                ))}

            </div>

        </section>
    )
}

export default Categories;