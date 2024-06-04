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
  innerElement?: React.ReactNode;
}

const Banner: React.FC<Props> = props => {


  const { t } = useTranslation('common');
  const { t: tHome } = useTranslation('home');

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));

  const domesticHotelDefaultDates: [string, string] = [today, tomorrow];

  const items: TabItem[] = [];


  const theme2 = process.env.THEME === "THEME2";

  const theme1 = process.env.THEME === "THEME1";


  if (props.modules.includes('domesticHotel') && process.env.PROJECT_MODULES?.includes("DomesticHotel")) {
    items.push(
      {
        key: '1',
        label: (<div className='text-center'> {!!theme1 && <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('domestic-hotel')} </div>),
        children: (<>
          <SearchForm wrapperClassName={`${theme2?"p-5":"py-5"}`} defaultDates={domesticHotelDefaultDates} />
          {!!theme1 && <RecentSearches />}
        </>
        ),
        children2: theme2 && <RecentSearches />
      }
    )
  }

  if (props.modules.includes('domesticFlight') && process.env.PROJECT_MODULES?.includes("DomesticFlight")) {
    items.push({
      key: '2',
      label: (<div className='text-center'> {!!theme1 && <Travel className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('domestic-flight')} </div>),
      children: (
        <>
          <FlightSearch wrapperClassName={theme2?"p-5":"py-5"} />
          {!!theme1 && <FlightRecentSearches />}
        </>
      ),
      children2: theme2 && <FlightRecentSearches  />
    })
  }

  if (props.modules.includes("cip") && process.env.PROJECT_MODULES?.includes("CIP")) {
    items.push({
      key: '3',
      label: (<div className='text-center'> {!!theme1 && <Suitcase className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('cip')} </div>),
      children: (
        <>
          <CipSearchForm wrapperClassName={theme2?"p-5":"py-5"} />
          {!!theme1 && <CipRecentSearches />}
        </>
      ),
      children2: theme2 && <CipRecentSearches />
    })

  }



  return (
    <div className={`relative ${theme1 ? "bg-cyan-800/50" : ""}`}>
      {!!theme1 && <Image
        src='/images/home/banner.jpg'
        alt="blue sky"
        width={1350}
        height={433}
        onContextMenu={(e) => e.preventDefault()}
        className='absolute top-0 left-0 w-full h-full object-cover object-center z-10 max-sm:hidden'
      />}
      <div className="max-w-container mx-auto pt-5 sm:px-3 sm:py-10 sm:pb-28 relative z-20">

        {!!theme1 && <h1 className="text-white drop-shadow-lg text-center font-bold text-xl sm:text-4xl mb-6 sm:mb-10" > {tHome("Plan-your-trip")} </h1>}

        <Tab
          items={items}
          wrapperClassName={`${theme2 ? "mb-6 sm:rounded-2xl sm:border sm:border-neutral-300" : "sm:rounded-lg px-5 pt-3 sm:p-5 bg-white"}`}
          tabLinksCenter={theme2}
          tabLinksBold={theme2}
          innerElement={props.innerElement}
        />

      </div>
    </div>
  )
}


export default Banner;