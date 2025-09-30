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

  const sitemap = creareSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;