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
      'cdn.mehrbooking.net',
      'blogonline.ir'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env: {
    PROJECT: "SAMITA",
    SITE_NAME: 'https://www.samita.com',
    THEME: "THEME1",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",

    // GOOGLE_ANALYTIC_ID: 'G-BT6EJ64D29',
    GOOGLE_TAG_MANAGER_ID: 'G-HQXGKRMK6R',

    PROJECT_SERVER_APIKEY: 'f19c03d2-7d38-4acf-bf29-64af58c4fe39',
    PROJECT_PORTAL_APIKEY: '68703d73-c92c-4105-9f71-9f718aaad2cc',
    
    PROJECT_SERVER_CMS:"cms2.safaraneh.com",
    
    PROJECT_SERVER_HOTEL_WP:"wp.safaraneh.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.safaraneh.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv5.safaraneh.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.safaraneh.com",
    PROJECT_SERVER_BLOG :"blogonline.ir/samita",
    PROJECT_SERVER_CRM:"crm.safaraneh.com",
    PROJECT_SERVER_PAYMENT: "payline.samita.com",
    PROJECT_SERVER_IDENTITY:"identity.safaraneh.com",
    PROJECT_SERVER_TRAVELER:"traveller.safaraneh.com",
    PROJECT_SERVER_CIP:"cip.safaraneh.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.safaraneh.com",
    PROJECT_SERVER_TENANTID: "6",
    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: "Flight Hotel CIP Blog ForeignFlight ForeignHotel",
    PROJECT_MODULES: "DomesticFlight DomesticHotel CIP Blog",
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;
