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
      'cdn.1stsafar.com',
      'cdn2.1stsafar.com',
      'panel.1stsafar.com',
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
    PROJECT: "1STSAFAR",
    SITE_NAME: 'https://www.1stsafar.com',
    THEME: "THEME1",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",

    GOOGLE_TAG_MANAGER_ID: 'G-HQXGKRMK6R',

    PROJECT_SERVER_APIKEY: 'e8fad1497a1244f29f15cde4a242baf0',
    PROJECT_PORTAL_APIKEY: 'b4fa99cc-3dfd-40a5-8bcf-53acdc2dbd84',
    
    PROJECT_SERVER_HOTEL_WP:"performance.1stsafar.com",
    PROJECT_SERVER_HOTEL_MAIN: "api.1stsafar.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.1stsafar.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv4.1stsafar.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.1stsafar.com",
    PROJECT_SERVER_BLOG :"panel.safaraneh.com",
    PROJECT_SERVER_CRM:"crm.1stsafar.com",
    PROJECT_SERVER_PAYMENT: "payline.1stsafar.com",
    PROJECT_SERVER_IDENTITY:"identity.1stsafar.com",
    PROJECT_SERVER_CIP:"cip.1stsafar.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.1stsafar.com",
    PROJECT_SERVER_TENANTID: "1040",
    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: ["Flight", "Hotel", "CIP", "Blog" , "ForeignFlight", "ForeignHotel"],
    PROJECT_MODULES: ["Flight", "Hotel", "CIP", "Blog" , "ForeignFlight", "ForeignHotel"],
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;
