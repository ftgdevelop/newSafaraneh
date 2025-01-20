/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/hotel/undefined/hotel/:slug',
        destination: '/hotel/:slug',
        permanent: true,
      },
      {
        source: '/en/blog/:slug',
        destination: '/fa/blog/:slug',
        locale: false,
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/fa/blog/:slug',
        locale: false,
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'cdn.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'cdn2.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'panel.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'blog.iranhotel.ir', pathname: '**'},
      {protocol: 'https', hostname: 'blogonline.ir', pathname: '**'},
      {protocol: 'https', hostname: 'hotelban.com', pathname: '**'},
      {protocol: 'https', hostname: 'trustseal.enamad.ir', pathname: '**'},
      {protocol: 'https', hostname: 'logo.samandehi.ir', pathname: '**'},
      {protocol: 'https', hostname: 'strapi.safarlife.com', pathname: '**'},
      {protocol: 'https', hostname: 'strapi.safaraneh.com', pathname: '**'},      
      {protocol: 'https', hostname: 'www.facebook.com', pathname: '**'},
      {protocol: 'https', hostname: 'cdn.mehrbooking.net', pathname: '**'},
      {protocol: 'https', hostname: 'iranhotel.app', pathname: '**'},
      {protocol: 'https', hostname: 'blogonline.ir', pathname: '**'}
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env: {
    PROJECT: "SAFARANEH",
    SITE_NAME: 'https://www.safaraneh.com',
    THEME: "THEME1",
    HOTEL_LIST_LAZY_LOAD: "lazy",
    SAFAR_MARKET_SITE_NAME: "",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",
    
    GOOGLE_ANALYTIC_ID: 'G-BT6EJ64D29',
    GOOGLE_TAG_MANAGER_ID: 'GTM-MJQWGBV',

    PROJECT_SERVER_APIKEY: 'e8fad1497a1244f29f15cde4a242baf0',
    PROJECT_PORTAL_APIKEY: 'b4fa99cc-3dfd-40a5-8bcf-53acdc2dbd84',
    
    PROJECT_SERVER_CMS:"cms2.safaraneh.com",
    
    PROJECT_SERVER_HOTEL_WP:"wp.safaraneh.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.safaraneh.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv4.safaraneh.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.safaraneh.com",
    PROJECT_SERVER_BLOG :"panel.safaraneh.com",
    PROJECT_SERVER_CRM:"crm.safaraneh.com",
    PROJECT_SERVER_PAYMENT: "payline.safaraneh.com",
    PROJECT_SERVER_IDENTITY:"identity.safaraneh.com",
    PROJECT_SERVER_TRAVELER:"traveller.safaraneh.com",
    PROJECT_SERVER_CIP:"cip.safaraneh.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.safaraneh.com",
    PROJECT_SERVER_TENANTID: "1040",
    
    PROJECT_SERVER_STRAPI:"",
    PROJECT_SERVER_STRAPI_TOKEN:"",
    PROJECT_SERVER_STRAPI_TENANT:"",

    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: "Flight Hotel CIP Blog ForeignFlight ForeignHotel",
    PROJECT_MODULES: "DomesticFlight DomesticHotel CIP Blog",
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;
