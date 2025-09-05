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
      {protocol: 'https', hostname: 'cdn.hotelban.com', pathname: '**'},
      {protocol: 'https', hostname: 'cdn2.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'panel.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'blog.iranhotel.ir', pathname: '**'},
      {protocol: 'https', hostname: 'blogonline.ir', pathname: '**'},
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
    PROJECT: "HOTELBAN",
    SITE_NAME: 'https://www.hotelban.com',
    THEME: "THEME3",
    HOTEL_LIST_LAZY_LOAD: "",
    SAFAR_MARKET_SITE_NAME: "hotelban",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",
    
    GOOGLE_ANALYTIC_ID: 'G-L9XG7Q3D68',
    GOOGLE_TAG_MANAGER_ID: 'G-1EXTLDBKNV',

    PROJECT_SERVER_APIKEY: '602d3109-6e40-4653-42a4-08dbc10a4f4a',
    PROJECT_PORTAL_APIKEY: '92ba7928-ab01-4011-be49-5bed7556ae2a',
    
    PROJECT_SERVER_CMS:"cms.hotelban.com",
    
    PROJECT_SERVER_HOTEL_WP:"performance.hotelban.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.hotelban.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv5.safaraneh.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.safaraneh.com",
    PROJECT_SERVER_BLOG :"blogonline.ir",
    PROJECT_SERVER_CRM:"crm.hotelban.com",
    PROJECT_SERVER_PAYMENT: "payline.hotelban.com",
    PROJECT_SERVER_IDENTITY:"identity.safaraneh.com",
    PROJECT_SERVER_TRAVELER:"traveller.safaraneh.com",
    PROJECT_SERVER_CIP:"cip.safaraneh.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.safaraneh.com",

    PROJECT_SERVER_TENANTID: "1047",

    PROJECT_SERVER_STRAPI:"strapi.safaraneh.com",
    PROJECT_SERVER_STRAPI_TOKEN : "de7c6a2c34c477963c83c51ad5b6b6be760002e52d53ba39ca05c20a68c8de23393c65ed1eab854d5f6e73af5e876bb4770ac7c402f92775b9dc6cffe464f98d7bf8e8a51e214d01632871b4e091ef309f986446893634e70f9a71602fa0a060c395084de4b4b9cde3b63d09738319235129170f1805a940a62716df7829d047",
    PROJECT_SERVER_STRAPI_TENANTID:"5",

    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: "Flight Hotel CIP Blog ForeignFlight ForeignHotel",
    PROJECT_MODULES: "DomesticHotel",
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;