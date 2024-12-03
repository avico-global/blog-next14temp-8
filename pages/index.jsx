import React, { useEffect } from "react";

// Components
import Head from "next/head";
import JsonLd from "@/components/json/JsonLd";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MustRead from "@/components/containers/MustRead";
import FullContainer from "@/components/common/FullContainer";
import SectionHeading from "@/components/common/SectionHeading";
import MostPopular from "@/components/containers/MostPopular";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";
import { useRouter } from "next/router";

import {
  getDomain,
  robotsTxt,
  sanitizeUrl,
  getImagePath,
  callBackendApi,
} from "@/lib/myFun";

// Font
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/containers/Banner";
import LatestBlogs from "@/components/containers/LatestBlogs";
import AllArticles from "@/components/containers/AllArticles";

export default function Home({
  logo,
  blog_list,
  imagePath,
  categories,
  domain,
  meta,
  about_me,
  nav_type,
  banner,
  favicon,
  layout,
  tag_list,
}) {
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${favicon}`}
        />
      </Head>

      {/* Navbar */}
      <Navbar
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        nav_type={nav_type}
      />

      {/* Main Content */}
      <FullContainer>
        <Container>
          <div className="flex flex-col gap-12">
            {/* Banner */}
            <Banner
              data={banner.value}
              image={`${imagePath}/${banner?.file_name}`}
              blog_list={blog_list}
            />

            {/* Latest Blogs */}
            <LatestBlogs articles={blog_list} imagePath={imagePath} />

            {/* Most Popular & Must Read */}
            <MostPopular articles={blog_list} imagePath={imagePath} />
            <MustRead articles={blog_list} imagePath={imagePath} />

            {/* All Articles & Rightbar */}
            <div className="grid grid-cols-1 md:grid-cols-home1 lg:grid-cols-home gap-12 w-full mt-14">
              <AllArticles articles={blog_list} imagePath={imagePath} />
              <Rightbar
                imagePath={imagePath}
                about_me={about_me}
                widgets={layout?.widgets}
                tag_list={tag_list}
                categories={categories}
                blog_list={blog_list}
              />
            </div>

            {/* Categories Section */}
          </div>
        </Container>
      </FullContainer>

      {/* Footer */}
      <Footer
        logo={logo}
        footer_text=""
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
      />

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `http://${domain}/`,
              },
            },
            {
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category}/${blog.key}`,
                  name: blog.title,
                  author: {
                    "@type": "Person",
                    name: blog.author,
                  },
                  datePublished: blog.datePublished,
                  dateModified: blog.dateModified,
                  image: {
                    "@type": "ImageObject",
                    url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${blog.imagePath}/${blog.imageFileName}`,
                    width: blog.imageWidth,
                    height: blog.imageHeight,
                  },
                  headline: blog.title,
                  description: blog.description,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `http://${domain}/${blog?.article_category
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}/${blog.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`,
                  },
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  let project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      banner: banner?.data[0],
      logo: logo?.data[0] || null,
      meta: meta?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      copyright: copyright?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      contact_details: contact_details?.data[0]?.value || null,
    },
  };
}
