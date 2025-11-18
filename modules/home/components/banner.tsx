import { useTranslation } from 'next-i18next';

import SearchForm from '../../domesticHotel/components/shared/SearchForm';
import { Apartment, Bed4, Suitcase, Suitcase2, Travel, Travel2, Accommodation } from '../../shared/components/ui/icons';
import Tab from '../../shared/components/ui/Tab';
import { TabItem } from '@/modules/shared/types/common';
import Image from 'next/image';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import FlightSearch from '@/modules/flights/components/shared/searchForm';
import CipSearchForm from '@/modules/cip/components/searchForm';
import RecentSearches from '@/modules/domesticHotel/components/home/HotelRecentSearches';
import FlightRecentSearches from '@/modules/flights/components/home/FlightRecentSearches';
import CipRecentSearches from '@/modules/cip/components/home/CipRecentSearches';
import Header from '@/modules/shared/components/header';
import { ReactNode } from 'react';
import Link from 'next/link';
import AccommodationSearchForm from '@/modules/accommodation/components/shared/AccommodationSearchForm';


type Props = {
  modules: ("domesticHotel" | "domesticFlight" | "cip" | "accommodation")[];
  innerElement?: React.ReactNode;
  bannerImage?: string;
  logo?: string;
  siteName?: string;
  activeTab?: string;
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
    
    let icon: ReactNode = null;
    let children2 : ReactNode = null;
    if(theme1){
      icon = <Apartment className='w-6 h-6 fill-current block mx-auto mb-1' />;
    }
    if (theme2 && !isSafarLife){
      children2 = <div className='max-sm:px-5' ><RecentSearches /></div>;
    }
    if (theme3){
      icon = <Bed4 className='w-6 h-6 fill-current inline-block rtl:ml-1' />;
      children2 = <div className='max-sm:px-3' ><RecentSearches /></div>;
    }

    items.push(
      {
        key: '1',
        // label: (<div className='text-center'> {icon} {t('domestic-hotel')} </div>),
        label: (
          <Link href="/" legacyBehavior>
            <a className="text-center">{icon} {t('domestic-hotel')}</a>
          </Link>
        ),
        children: (<>
          <SearchForm wrapperClassName={`${theme3 ? "py-3 sm:py-8" :theme2 ? "p-5" : "py-5"}`} defaultDates={domesticHotelDefaultDates} />
          {!!theme1 && <RecentSearches />}
        </>
        ),
        children2: children2,
      }
    )
  }

  if (props.modules.includes('domesticFlight') && process.env.PROJECT_MODULES?.includes("DomesticFlight")) {

    let icon: ReactNode = null;
    let children2 : ReactNode = null;
    if(theme1){
      icon = <Travel className='w-6 h-6 fill-current block mx-auto mb-1' />;
    }
    if(theme2 && !isSafarLife){
      children2 = <div className='max-sm:px-5' ><FlightRecentSearches /></div>;
    }
    if (theme3){
      icon = <Travel2 className='w-6 h-6 fill-current inline-block rtl:ml-1' />;
      children2 = <div className='max-sm:px-5' ><FlightRecentSearches /></div>;
    }

    items.push({
      key: '2',
      label: (<div className='text-center'> {icon} {t('domestic-flight')} </div>),
      children: (
        <>
          <FlightSearch wrapperClassName={theme2 ? "p-5" : "py-5"} />
          {!!theme1 && <FlightRecentSearches />}
        </>
      ),
      children2: children2
    })
  }

  if (props.modules.includes("cip") && process.env.PROJECT_MODULES?.includes("CIP")) {

    let icon: ReactNode = null;
    let children2 : ReactNode = null;

    if(theme1){
      icon = <Suitcase className='w-6 h-6 fill-current block mx-auto mb-1' />;
    }
    if( theme2 && !isSafarLife){
      children2 = <div className='max-sm:px-5'><CipRecentSearches /></div>;
    }
    if (theme3){
      icon = <Suitcase2 className='w-6 h-6 fill-current inline-block rtl:ml-1' />;
      children2 = <div className='max-sm:px-5'><CipRecentSearches /></div>;
    }

    items.push({
      key: '3',
      label: (<div className='text-center'> {icon} {t('cip')} </div>),
      children: (
        <>
          <CipSearchForm wrapperClassName={theme2 ? "p-5" : "py-5"} />
          {!!theme1 && <CipRecentSearches />}
        </>
      ),
      children2: children2
    })

  }

  if (props.modules.includes('accommodation') && process.env.PROJECT_MODULES?.includes("Accommodation")) {
    
    let icon: ReactNode = null;
    let children2 : ReactNode = null;
    if (theme3){
      icon = <Accommodation className='w-6 h-6 fill-current inline-block rtl:ml-1' />;
      // children2 = <div className='max-sm:px-3' ><RecentSearches /></div>;
    }

    items.push(
      {
        key: '4',
        // label: (<div className='text-center'> {icon} {t('accommodation')} </div>),
        label: (
          <Link href="/accommodation" legacyBehavior>
            <a className="text-center">{icon} {t('accommodation')}</a>
          </Link>
        ),
        children: (<>
          <AccommodationSearchForm wrapperClassName={`${theme3 ? "py-3 sm:py-8" :theme2 ? "p-5" : "py-5"}`} defaultDates={domesticHotelDefaultDates} />
        </>
        ),
        children2: children2,
      }
    )
  }

  const tabs = <Tab
    style={theme2 ? "expedia-home" : theme3 ? "theme3" : "1"}
    items={items}
    wrapperClassName={`${theme3 ? "sm:bg-white sm:rounded-2xl p-3 sm:p-4 sm:mt-6 md:mt-20" :theme2 ? "mb-6 sm:rounded-2xl sm:border sm:border-neutral-300" : "sm:rounded-lg px-5 pt-3 sm:p-5 bg-white"}`}
    tabLinksBold={theme2}
    innerElement={props.innerElement}
    showTabsWhenThereIsOnlyOneItem={theme2}
  />;

  return (
    <div className={`relative ${theme1 ? "bg-cyan-800/50" :theme3 ? "bg-stone-50 pb-4 lg:pb-12": ""}`}>
      {!!theme3 && <div className='max-sm:hidden absolute bottom-0 left-0 right-0 h-1/2 z-[11] bg-gradient-to-t from-black/50 to-trabsparent' />}
      
      {!!theme1 || props.bannerImage && <Image
        src={props.bannerImage || '/images/home/banner.jpg'}
        alt="hero image"
        width={1350}
        height={433}
        onContextMenu={(e) => e.preventDefault()}
        className='absolute top-0 left-0 w-full h-full object-cover object-center z-10 max-sm:hidden'
      />}

      <div className={`max-w-container mx-auto ${theme3?"sm:px-5":"sm:px-3"} relative z-20 ${theme1 ? "sm:py-10 sm:pb-28 pt-5" : theme2 ? "pb-5 sm:pb-8 pt-5" : "sm:pt-5 md:pt-8"}`}>

        {!!theme1 && <h1 className="text-white drop-shadow-lg text-center font-bold text-xl sm:text-4xl mb-6 sm:mb-10" > {tHome("Plan-your-trip")} </h1>}

        {!!(theme3 && props.siteName && props.logo) && <Header logo={props.logo} siteName={props.siteName} withoutContainer />}

        {tabs}

      </div>

    </div>
  )
}


export default Banner;