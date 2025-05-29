import { useTranslation } from 'next-i18next';

import { Headset, PersentBadge, Discount, ImmediateVoucher } from '../../shared/components/ui/icons';
import Image from 'next/image';
import { ServerAddress } from '@/enum/url';

type Props = {
    siteName: string;
    strapiData?: {
        Title?: string;
        Items?: {
            Description?: string;
            Title?: string;
            ImageAlternative?: string;
            ImageTitle?: string;
            Image?: {
                data?: {
                    attributes?: {
                        url?: string;
                    }
                }
            }
        }[]
    }
}


const Services: React.FC<Props> = props => {

    const { t: tHome } = useTranslation('home');

    const iconsClassName = "block mx-auto w-14 h-14 mb-8 mt-4";

    const services: {
        icon: React.ReactNode;
        title: string;
        description: string;
    }[] = props.strapiData?.Items?.length ?
            props.strapiData?.Items.map(item => ({
                description: item.Description || "",
                icon: <Image
                    alt={item.Title || ""}
                    src={item.Image?.data?.attributes?.url ? `${ServerAddress.Type}${ServerAddress.Strapi}${item.Image.data.attributes.url}` : "/images/layers-2x.png"}
                    width={56}
                    height={56}
                    className='w-14 h-14 mx-auto my-5'
                />,
                title: item.Title || ""
            }))
            :
            [
                {
                    icon: <Headset className={iconsClassName} />,
                    title: tHome('service1'),
                    description: tHome('service1-desc', { portalName: props.siteName })
                },
                {
                    icon: <PersentBadge className={iconsClassName} />,
                    title: tHome('service2'),
                    description: tHome('service2-desc', { portalName: props.siteName })
                },
                {
                    icon: <Discount className={iconsClassName} />,
                    title: tHome('service3'),
                    description: tHome('service3-desc', { portalName: props.siteName })
                },
                {
                    icon: <ImmediateVoucher className={iconsClassName} />,
                    title: tHome('service4'),
                    description: tHome('service4-desc', { portalName: props.siteName })
                },
            ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>

            {services?.map(service => (

                <div key={service.title} className='bg-white p-5 rounded-lg border border-neutral-200'>
                    {service.icon}
                    <h2 className='font-semibold text-neytral-600 mb-6 text-center'>{service.title}</h2>
                    <p className='text-xs leading-5 text-justify'> {service.description}</p>
                </div>
            ))}

        </div>
    )
}

export default Services;