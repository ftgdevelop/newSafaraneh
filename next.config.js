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
    domains: [
      'cdn.safaraneh.com',
      'cdn2.safaraneh.com',
      'panel.safaraneh.com',
      'blog.iranhotel.ir',
      'trustseal.enamad.ir',
      'logo.samandehi.ir',
      'www.facebook.com',
      'cdn.mehrbooking.net'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env: {
    PROJECT: "MRBILET",
    SITE_NAME: 'https://www.mrbilet.ir',
    THEME: "THEME1",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",
    
    GOOGLE_ANALYTIC_ID: 'G-BR3QBTY92P',
    GOOGLE_TAG_MANAGER_ID: 'GTM-MJQWGBV',

    PROJECT_SERVER_APIKEY: 'ea3501f1-4d51-48b7-08db-08dc06a299bd',
    PROJECT_PORTAL_APIKEY: '4bdab768-9960-4405-89a4-e4387f7a9992',
    
    PROJECT_SERVER_HOTEL_WP:"wp.safaraneh.com",
    PROJECT_SERVER_HOTEL_MAIN: "api.safaraneh.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.safaraneh.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv4.safaraneh.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.safaraneh.com",
    PROJECT_SERVER_BLOG :"https://blog.iranhotel.ir/",
    PROJECT_SERVER_CRM:"crm.safaraneh.com",
    PROJECT_SERVER_PAYMENT: "payline.safaraneh.com",
    PROJECT_SERVER_IDENTITY:"identity.safaraneh.com",
    PROJECT_SERVER_TRAVELER:"traveller.safaraneh.com",
    PROJECT_SERVER_CIP:"cip.safaraneh.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.safaraneh.com",
    PROJECT_SERVER_TENANTID: "1046",
    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: ["Flight", "Hotel", "CIP", "Blog" , "ForeignFlight", "ForeignHotel"],
    PROJECT_MODULES: ["Flight", "Hotel", "CIP", "Blog" , "ForeignFlight", "ForeignHotel"],
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;
