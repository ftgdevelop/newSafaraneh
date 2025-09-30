import axios from "axios";

function creareSiteMap(domesticFlightsData:any){

  let domesticFlightXML = "";

  if(domesticFlightsData){
    for (let i = 0; i < domesticFlightsData.length; i++) {
      const flight = domesticFlightsData[i];

      const domesticFlightURL = `${process.env.SITE_NAME}${process.env.LocaleInUrl === "off"?"":"/fa"}/flights/${flight.slug}/`;
      domesticFlightXML += `
        <url>
          <loc>${domesticFlightURL}</loc>
          <lastmod>${flight.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
        </url>`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${domesticFlightXML}
    </sitemapindex>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res }:{res:any}) => {
  
  let sitemap: any;
  
  if(process.env.PROJECT_SERVER_BLOG){
    const flightResponse = await axios.get(`${process.env.PROJECT_SERVER_BLOG}wp-json/wp/v2/flightdomestic`);
    
    sitemap = creareSiteMap( flightResponse?.data );
  }else{
    sitemap = creareSiteMap(undefined);
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;