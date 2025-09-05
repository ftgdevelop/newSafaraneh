import {Hotel, ServerAddress } from "@/enum/url";
import axios from "axios";

function creareSiteMap(items:{
  url?: string;
  galleries?:{
    fileAltAttribute?: string;
    filePath?: string;
    fileTitleAttribute?: string;
    id:number;
  }[];
}[]){

  let contents = "";

  if(items.length){
    for(let i = 0 ; i < items.length ; i++ ){

      const images = items[i]?.galleries;
      
      let imagesPart = "";
      if(images?.length){
        for(let j = 0 ; j < images.length ; j++ ){
          imagesPart += `
          <image:image>
            <image:loc>${images[j]?.filePath}</image:loc>
            <image:caption>${images[j]?.fileAltAttribute||""}</image:caption>
            <image:title>${images[j]?.fileTitleAttribute||""}</image:title>
          </image:image>
          `;
        }
      }

      contents += `
          <url>
            <loc>${process.env.SITE_NAME}${items[i]?.url}</loc>
            ${imagesPart}
          </url>    
      `;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${contents}
    </urlset>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res, query }:{res:any, query:any}) => {

  const pageQuery = query.page?.split("imageSitemap-")?.[1]?.split(".")?.[0] || 1;

  const pagesResponse: any = await axios.get(
    `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetAllForSiteMapImages}?SkipCount=${(pageQuery-1)*100}&MaxResultCount=100`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fa-IR',
        apikey: process.env.PROJECT_PORTAL_APIKEY,
      },
    }).catch(function (error) {
      console.log("error");
    });

    const sitemap = creareSiteMap(pagesResponse?.data?.result?.items);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

  return {
    props: {
    }
  }
}

export default SiteMap;