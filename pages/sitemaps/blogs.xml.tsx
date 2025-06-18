import axios from "axios";

function creareSiteMap(postsData:any){
  let latestPost = 0;
  let postsXML = "";
  
  if(postsData){
    for (let i = 0; i < postsData.length; i++) {
      const post = postsData[i];

      const postDate = Date.parse(post.modified);
      if (!latestPost || postDate > latestPost) {
        latestPost = postDate;
      }

      const postUrl = `${process.env.SITE_NAME}${process.env.LocaleInUrl === "off"?"":"/fa"}/blog/${post.slug}/`;
      postsXML += `
        <url>
          <loc>${postUrl}</loc>
          <lastmod>${post.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.7</priority>
        </url>`;
    }
  }

  if (!postsXML) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    </sitemapindex>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${postsXML}
    </sitemapindex>`;
}

function SiteMap() {
}

export const getServerSideProps = async ({ res }:{res:any}) => {

  let sitemap :any;

  if(process.env.PROJECT_SERVER_BLOG){
    const postsResponse = await axios.get(`${process.env.PROJECT_SERVER_TYPE}${process.env.PROJECT_SERVER_BLOG}//wp-json/wp/v2/posts?per_page=100`);
    sitemap = creareSiteMap(postsResponse?.data );
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