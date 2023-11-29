import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

const ModulesBanner: React.FC = () => {

  const { t } = useTranslation('common');

  const linkClassName = "rounded-lg overflow-hidden block relative before:block before:absolute before:top-0 before:left-0 before:right-0 before:h-40 before:bg-gradient-to-b before:from-black/75 before:to-transparent";

  return (
      <div className="max-w-container mx-auto p-5 md:py-10">

        <h2 className='text-xl font-bold mb-4'>ویژه‌های سفر</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

          <Link
            href='/hotels/هتل-های-شیراز'
            className={`${linkClassName} md:row-span-2`}
          >
            <div className='absolute top-0 right-0 left-0 p-5 text-white'>
              <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
                {t('big-banner-h4')}
              </h2>
              <div>
                <span className='inline-block bg-red-500 px-2 leading-6 py-0 rounded text-2xs'> {t('big-banner-span')} </span>
              </div>
            </div>

            <Image
              src="https://cdn2.safaraneh.com/images/home/shirazhomebanner.jpg"
              alt="حافظیه شیراز"
              title={t('big-banner-h4')}
              width={570}
              height={370}
              className='h-48 md:h-full w-full object-cover object-center rounded-lg'
            />

          </Link>


          <Link href='/cip/فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات' className={linkClassName} >

            <div className='absolute top-0 right-0 left-0 p-5 text-white'>
              <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
                {t('small-banner1-h4')}
              </h2>
            </div>

            <Image
              src="https://cdn2.safaraneh.com/images/home/cipemamhomebanner.jpg"
              alt="تشریفات فرودگاهی"
              title={t('small-banner1-h4')}
              width={570}
              height={190}
              className='h-48 w-full object-cover object-center rounded-lg'
            />

          </Link>


          <Link href='/hotels/هتل-های-تهران' className={linkClassName}>

            <div className='absolute top-0 right-0 left-0 p-5 text-white'>
              <h2 className='bg-black/25 text-sm md:text-lg px-3 py-1 mb-2 rounded inline-block font-bold'>
                {t('small-banner2-h4')}
              </h2>
              <div>
                <span className='inline-block bg-red-500 px-2 leading-6 py-0 rounded text-2xs'> {t('small-banner2-span')} </span>
              </div>
            </div>

            <Image
              src="https://cdn2.safaraneh.com/images/home/hotelhomebanner.jpg"
              alt="هتل های تهران"
              title={t('big-banner2-h4')}
              width={570}
              height={190}
              className='h-48 w-full object-cover object-center rounded-lg'
            />
          </Link>

        </div>


      </div>
  )
}


export default ModulesBanner;