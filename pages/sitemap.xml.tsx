import { ServerAddress } from "@/enum/url";

function creareSiteMap(){

  let contents = "";

  if(ServerAddress.CMS){
    contents += `    
    <sitemap>
      <loc>${process.env.SITE_NAME}/sitemaps/pages.xml</loc>
    </sitemap>
  `}

  if(process.env.PROJECT_SERVER_BLOG){
    contents += `
    <sitemap>
      <loc>${process.env.SITE_NAME}/sitemaps/blogs.xml</loc>
    </sitemap>
    <sitemap>
      <loc>${process.env.SITE_NAME}/sitemaps/flights.xml</loc>
    </sitemap>    
  `}

  if(process.env.PROJECT_SERVER_HOTEL_DATA){
    contents += `
      <sitemap>
        <loc>${process.env.SITE_NAME}/sitemaps/images.xml</loc>
      </sitemap>    
  `}

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${contents}    
    </sitemapindex>`;
}

function SiteMap() {}

export const getServerSideProps = async ({ res }:{res:any}) => {

<<<<<<< Updated upstream

  const [postsResponse, pagesResponse, flightResponse] = await Promise.all([
    
    axios.get(`${process.env.PROJECT_SERVER_TYPE}${process.env.PROJECT_SERVER_BLOG}//wp-json/wp/v2/posts?per_page=100`).catch(function (error) {
      console.log("error");
    })
    ,
    axios.get(
      "https://cms2.safaraneh.com/api/services/app/Page/GetAll",
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          apikey: process.env.PROJECT_PORTAL_APIKEY,
        },
      }).catch(function (error) {
        console.log("error");
      })    
    ,
    axios.get(`${process.env.PROJECT_SERVER_BLOG}wp-json/wp/v2/flightdomestic`).catch(function (error) {
      console.log("error");
    })
  ]);

  const sitemap = creareSiteMap(pagesResponse?.data?.result , postsResponse?.data, flightResponse?.data );
=======
  const sitemap = creareSiteMap();
>>>>>>> Stashed changes

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;