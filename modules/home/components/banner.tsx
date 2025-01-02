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
  bannerImage?: string;
}

const Banner: React.FC<Props> = props => {


  const { t } = useTranslation('common');
  const { t: tHome } = useTranslation('home');
  
  const isSafarLife = process.env.SITE_NAME === 'https://www.safarlife.com';

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));

  const domesticHotelDefaultDates: [string, string] = [today, tomorrow];

  const items: TabItem[] = [];

  const theme1 = process.env.THEME === "THEME1";
  const theme2 = process.env.THEME === "THEME2";
  const theme3 = process.env.THEME === "THEME3";

  if (props.modules.includes('domesticHotel') && process.env.PROJECT_MODULES?.includes("DomesticHotel")) {
    items.push(
      {
        key: '1',
        label: (<div className='text-center'> {!!theme1 && <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('domestic-hotel')} </div>),
        children: (<>
          <SearchForm wrapperClassName={`${theme3 ? "py-3 sm:py-14" :theme2 ? "p-5" : "py-5"}`} defaultDates={domesticHotelDefaultDates} />
          {!!theme1 && <RecentSearches />}
        </>
        ),
        children2: theme2 && !isSafarLife ? <div className='max-sm:px-5' ><RecentSearches /></div> : null
      }
    )
  }

  if (props.modules.includes('domesticFlight') && process.env.PROJECT_MODULES?.includes("DomesticFlight")) {
    items.push({
      key: '2',
      label: (<div className='text-center'> {!!theme1 && <Travel className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('domestic-flight')} </div>),
      children: (
        <>
          <FlightSearch wrapperClassName={theme2 ? "p-5" : "py-5"} />
          {!!theme1 && <FlightRecentSearches />}
        </>
      ),
      children2: theme2 && !isSafarLife ? <div className='max-sm:px-5' ><FlightRecentSearches /></div> : null
    })
  }

  if (props.modules.includes("cip") && process.env.PROJECT_MODULES?.includes("CIP")) {
    items.push({
      key: '3',
      label: (<div className='text-center'> {!!theme1 && <Suitcase className='w-6 h-6 fill-current block mx-auto mb-1' />} {t('cip')} </div>),
      children: (
        <>
          <CipSearchForm wrapperClassName={theme2 ? "p-5" : "py-5"} />
          {!!theme1 && <CipRecentSearches />}
        </>
      ),
      children2: theme2 && !isSafarLife ? <div className='max-sm:px-5'><CipRecentSearches /></div> : null
    })

  }

  const tabs = <Tab
    style={theme2 ? "expedia-home" : theme3 ? "almosafer-home" : "1"}
    items={items}
    wrapperClassName={`${theme3 ? "" :theme2 ? "mb-6 sm:rounded-2xl sm:border sm:border-neutral-300" : "sm:rounded-lg px-5 pt-3 sm:p-5 bg-white"}`}
    tabLinksBold={theme2}
    innerElement={props.innerElement}
    showTabsWhenThereIsOnlyOneItem={theme2}
  />;

  return (
    <div className={`relative ${theme1 ? "bg-cyan-800/50" : theme3 ? "md:bg-theme3-banner md:bg-cover md:bg-center" : ""}`}>
      {!!theme1 || props.bannerImage && <Image
        src={props.bannerImage || '/images/home/banner.jpg'}
        alt="blue sky"
        width={1350}
        height={433}
        onContextMenu={(e) => e.preventDefault()}
        className='absolute top-0 left-0 w-full h-full object-cover object-center z-10 max-sm:hidden'
      />}

      {!!theme3 && (
        <div className='max-md:hidden max-w-container mx-auto px-3 md:px-5 py-6 md:pt-24 md:pb-10  text-white'>
          <h2 className='text-xl lg:text-5xl font-bold mb-4'> سفر بعدی خود را رزرو کنید! </h2>
          <p className='text-base'>  از بین بیش از 1.5 میلیون هتل و بیش از 450  ایرلاین انتخاب کنید </p>
        </div>
      )}

      {theme3?(
        tabs
      ):(
        <div className={`pt-5 max-w-container mx-auto sm:px-3 relative z-20 ${theme1 ? "sm:py-10 sm:pb-28" : theme2 ? "pb-5 sm:pb-8" : ""}`}>

          {!!theme1 && <h1 className="text-white drop-shadow-lg text-center font-bold text-xl sm:text-4xl mb-6 sm:mb-10" > {tHome("Plan-your-trip")} </h1>}

          {tabs}

        </div>
      )}

    </div>
  )
}


export default Banner;