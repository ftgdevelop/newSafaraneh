import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const ModulesBanner: React.FC = () => {
  const { t:tHome } = useTranslation('home');

  const linkClassName = "rounded-lg overflow-hidden block relative before:block before:absolute before:top-0 before:left-0 before:right-0 before:h-40 before:bg-gradient-to-b before:from-black/75 before:to-transparent";

  return (
    <>
      <h2 className='text-xl font-semibold mb-4 mt-5 md:mt-10'>ویژه‌های سفر</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:mb-10'>

        {!!(process.env. PROJECT_MODULES?.includes("DomesticHotel")) && <Link
          href='/hotels/هتل-های-شیراز'
          className={`${linkClassName} ${process.env. PROJECT_MODULES?.includes("CIP")?"md:row-span-2":""}`}
        >
          <div className='absolute top-0 right-0 left-0 p-5 text-white'>
            <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
              {tHome('big-banner-h4')}
            </h2>
            <div>
              <span className='inline-block bg-red-500 px-2 leading-6 py-0 rounded text-2xs'> {tHome('big-banner-span')} </span>
            </div>
          </div>

          <Image
            onContextMenu={e => {e.preventDefault()}}
            src="https://cdn2.safaraneh.com/images/home/shirazhomebanner.jpg"
            alt="حافظیه شیراز"
            title={tHome('big-banner-h4')}
            priority
            width={570}
            height={370}
            className='h-48 md:h-full w-full object-cover object-center rounded-lg'
          />

        </Link>}


        {!!(process.env. PROJECT_MODULES?.includes("CIP")) && <Link 
          href='/cip/فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات' className={linkClassName} >

          <div className='absolute top-0 right-0 left-0 p-5 text-white'>
            <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
              {tHome('small-banner1-h4')}
            </h2>
          </div>

          <Image
            onContextMenu={e => {e.preventDefault()}}
            src="https://cdn2.safaraneh.com/images/home/cipemamhomebanner.jpg"
            alt="تشریفات فرودگاهی"
            title={tHome('small-banner1-h4')}
            width={570}
            height={190}
            className='h-48 w-full object-cover object-center rounded-lg'
          />

        </Link>}


        {!!(process.env. PROJECT_MODULES?.includes("DomesticHotel")) && <Link href='/hotels/هتل-های-تهران' className={linkClassName}>

          <div className='absolute top-0 right-0 left-0 p-5 text-white'>
            <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
              {tHome('small-banner2-h4')}
            </h2>
            <div>
              <span className='inline-block bg-red-500 px-2 leading-6 py-0 rounded text-2xs'> {tHome('small-banner2-span')} </span>
            </div>
          </div>

          <Image
            onContextMenu={e => {e.preventDefault()}}
            src="https://cdn2.safaraneh.com/images/home/hotelhomebanner.jpg"
            alt="هتل های تهران"
            width={570}
            height={process.env. PROJECT_MODULES?.includes("CIP") ? 370 : 190}
            className='h-48 w-full md:h-full object-cover object-center rounded-lg'
          />
        </Link>}

      </div>
    </>
  )
}


export default ModulesBanner;