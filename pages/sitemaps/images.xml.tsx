import { Hotel, ServerAddress } from "@/enum/url";
import axios from "axios";

function creareSiteMap(count:number){

  let contents = "";

  const pages = Math.ceil(count / 100);

  if(pages){
    for(let i = 0 ; i < pages ; i++ ){
      contents += `
          <sitemap>
            <loc>${process.env.SITE_NAME}/sitemaps/images/imageSitemap-${i+1}.xml</loc>
          </sitemap>    
      `;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${contents}    
    </sitemapindex>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res }:{res:any}) => {

  const pagesResponse: any = await axios.get(
    `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetAllForSiteMapImages}?SkipCount=0&MaxResultCount=5`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fa-IR',
        apikey: process.env.PROJECT_PORTAL_APIKEY,
      },
    }).catch(function (error) {
      console.log("error");
    });

    const sitemap = creareSiteMap(pagesResponse?.data?.result?.totalCount );

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;