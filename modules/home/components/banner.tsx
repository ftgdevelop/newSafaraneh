import { useTranslation } from 'next-i18next';

import SearchForm from '../../domesticHotel/components/shared/SearchForm';
import { Apartment, Suitcase, Travel } from '../../shared/components/ui/icons';
import Tab from '../../shared/components/ui/Tab';
import { TabItem } from '@/modules/shared/types/common';
import Image from 'next/image';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import FlightSearch from '@/modules/flights/components/shared/searchForm';
import CipSearchForm from '@/modules/cip/components/searchForm';
import RecentSearches from '@/modules/domesticHotel/components/home/HotelRecentSearches';
import FlightRecentSearches from '@/modules/flights/components/home/FlightRecentSearches';
import CipRecentSearches from '@/modules/cip/components/home/CipRecentSearches';


type Props = {
  modules: ("domesticHotel" | "domesticFlight" | "cip")[];
}

const Banner: React.FC<Props> = props => {


  const { t } = useTranslation('common');
  const { t: tHome } = useTranslation('home');

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));

  const domesticHotelDefaultDates: [string, string] = [today, tomorrow];

  const items: TabItem[] = [];

  if (props.modules.includes('domesticHotel') && process.env.PROJECT_MODULES?.includes("Hotel")) {
    items.push(
      {
        key: '1',
        label: (<div className='text-center'> <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' /> {t('domestic-hotel')} </div>),
        children: (<>
          <SearchForm wrapperClassName='py-5' defaultDates={domesticHotelDefaultDates} />
          <RecentSearches />
        </>)
      }
    )
  }

  if (props.modules.includes('domesticFlight') && process.env.PROJECT_MODULES?.includes("Flight")) {
    items.push({
      key: '2',
      label: (<div className='text-center'> <Travel className='w-6 h-6 fill-current block mx-auto mb-1' /> {t('domestic-flight')} </div>),
      children: (
        <>
          <FlightSearch />
          <FlightRecentSearches />
        </>
      )
    })
  }

  if (props.modules.includes("cip") && process.env.PROJECT_MODULES?.includes("CIP")) {
    items.push({
      key: '3',
      label: (<div className='text-center'> <Suitcase className='w-6 h-6 fill-current block mx-auto mb-1' /> {t('cip')} </div>),
      children: (
        <>
          <CipSearchForm />
          <CipRecentSearches />
        </>
      )
    })

  }

  return (
    <div className="relative bg-cyan-800/50">
      <Image
        src='/images/home/banner.jpg'
        alt="blue sky"
        width={1350}
        height={433}
        onContextMenu={(e) => e.preventDefault()}
        className='absolute top-0 left-0 w-full h-full object-cover object-center z-10 max-sm:hidden'
      />
      <div className="max-w-container mx-auto pt-5 sm:px-3 sm:py-10 sm:pb-28 relative z-20">

        <h1 className="text-white drop-shadow-lg text-center font-bold text-xl sm:text-4xl mb-6 sm:mb-10" > {tHome("Plan-your-trip")} </h1>

        <div className="px-5 pt-3 sm:p-5 bg-white sm:rounded-lg">
          <Tab items={items} />
        </div>


      </div>
    </div>
  )
}


export default Banner;