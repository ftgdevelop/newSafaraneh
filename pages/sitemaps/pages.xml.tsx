import { Cms, ServerAddress } from "@/enum/url";
import axios from "axios";

function creareSiteMap(pagesData:any){

  let pagesXML = "";
  
  if(pagesData){
    for(let i = 0 ; i <pagesData.length ; i++ ){
      const page = pagesData[i];
      const pageUrl = `${process.env.SITE_NAME}${page.url}/`;
      pagesXML += `
        <url>
          <loc>${pageUrl}</loc>
          <changefreq>${page.frequency}</changefreq>
          <priority>${page.priority}</priority>
        </url>`;
    }    
  }else{
    pagesXML = `
    <url>
      <loc>${process.env.SITE_NAME}${process.env.LocaleInUrl === "off"?"":"/fa"}/</loc>
      <lastmod>2021-02-03</lastmod>
      <priority>1.0</priority>
    </url>`;
  }


  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      ${pagesXML}

    </sitemapindex>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res }:{res:any}) => {

  const pagesResponse: any = await axios.get(
    `${ServerAddress.Type}${ServerAddress.CMS}${Cms.GetAllPages}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fa-IR',
        apikey: process.env.PROJECT_PORTAL_APIKEY,
      },
    }).catch(function (error) {
      console.log("error");
    });

    const sitemap = creareSiteMap(pagesResponse?.data?.result );

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;