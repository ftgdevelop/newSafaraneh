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
      'cdn.safarlife.com',
      'cdn2.safarlife.com',
      'panel.safarlife.com',
      'blog.iranhotel.ir',
      'trustseal.enamad.ir',
      'logo.samandehi.ir',
      'strapi.safarlife.com',
      'www.facebook.com',
      'cdn.mehrbooking.net'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  env: {
    PROJECT: "SAFARLIFE",
    LocaleInUrl : "off",
    SITE_NAME: 'https://www.safarlife.com',
    THEME: "THEME2",
    SAFAR_MARKET_SITE_NAME: "",
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_USER: "",

    GOOGLE_TAG_MANAGER_ID: 'G-HQXGKRMK6R',

    PROJECT_SERVER_APIKEY: 'e8fad1497a1244f29f15cde4a242baf0',
    PROJECT_PORTAL_APIKEY: 'b4fa99cc-3dfd-40a5-8bcf-53acdc2dbd84',
    
    PROJECT_SERVER_CMS:"cms2.safarlife.com",
    PROJECT_SERVER_HOTEL_WP:"performance.safarlife.com",
    PROJECT_SERVER_HOTEL_DATA: "hoteldomesticdata.safarlife.com",
    PROJECT_SERVER_HOTEL_AVAILABILITY: "hotelv4.safarlife.com",
    PROJECT_SERVER_COORDINATOR:"coordinator.safarlife.com",
    PROJECT_SERVER_BLOG :"panel.safarlife.com",
    PROJECT_SERVER_TRAVELER:"traveller.safarlife.com",
    PROJECT_SERVER_CRM:"crm.safarlife.com",
    PROJECT_SERVER_PAYMENT: "payline.safarlife.com",
    PROJECT_SERVER_IDENTITY:"identity.safarlife.com",
    PROJECT_SERVER_CIP:"cip.safarlife.com",
    PROJECT_SERVER_FLIGHT: "flightdomestic.safarlife.com",
    PROJECT_SERVER_TENANTID: "1040",

    PROJECT_SERVER_STRAPI:"strapi.safarlife.com",
    PROJECT_SERVER_STRAPI_TOKEN:"0590b9f488f09331bc3f755584b61d914abd087fe3eb8aeb430d1d4280016fe8bd01b91bdd922c064fe2375e586b983b223242292dd727118e7871c9135afcd695cd687a4663cbd36a32fabf8f0ece014d705bacff1025d24e8efcb0f07d910c821c94e3e565551f43295e79c824418bb74c9d14b6bb8f8f62e07ed9c603a176",
    PROJECT_SERVER_STRAPI_TENANT:"",

    PROJECT_SERVER_NATIONALITY: "",
    PORT: '',
    //PROJECT_MODULES: "DomesticHotel DomesticFlight CIP Blog ForeignFlight ForeignHotel",
    PROJECT_MODULES: "DomesticHotel Blog",
    // DEFAULT_lAN:"US",
    // LANGUAGES:["US","NO","FA"]

  }
}

module.exports = nextConfig;
