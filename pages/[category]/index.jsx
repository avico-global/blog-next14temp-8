import React from "react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import Rightbar from "@/components/containers/Rightbar";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Container from "@/components/common/Container";
import Footer from "@/components/containers/Footer";
import JsonLd from "@/components/json/JsonLd";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import CategoryBreadcrumbs from "@/components/common/CategoryBreadcrumbs";

export default function Category({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  tag_list,
  layout,
  contact_details,
  copyright,
  nav_type,
  page,
}) {
  const router = useRouter();
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();
  const markdownIt = new MarkdownIt();

  const convertMarkdown = (markdownText) => markdownIt?.render(markdownText);

  const searchContent = category?.replaceAll("-", " ");
  const filteredBlogList = blog_list.filter((item) => {
    return item.article_category.toLowerCase() === searchContent;
  });

  return (
    page?.enable && (
      <div className="flex flex-col min-h-screen justify-between">
        <Head>
          <meta charSet="UTF-8" />
          <title>
            {meta?.title?.replaceAll(
              "##category##",
              category?.replaceAll("-", " ")
            )}
          </title>
          <meta
            name="description"
            content={meta?.description.replaceAll(
              "##category##",
              category?.replaceAll("-", " ")
            )}
          />
          <link rel="author" href={`http://${domain}`} />
          <link rel="publisher" href={`http://${domain}`} />
          <link rel="canonical" href={`http://${domain}/${category}`} />
          <meta name="robots" content="noindex" />
          <meta name="theme-color" content="#008DE5" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <GoogleTagManager />
          <meta
            name="google-site-verification"
            content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`https://api15.ecommcube.com/${domain}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`https://api15.ecommcube.com/${domain}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`https://api15.ecommcube.com/${domain}/favicon-16x16.png`}
          />
        </Head>

        <Navbar
          category={category}
          blog_list={blog_list}
          categories={categories}
          logo={logo}
          nav_type={nav_type}
          imagePath={imagePath}
          contact_details={contact_details}
        />

        <FullContainer className="py-16">
          <Container>
            <CategoryBreadcrumbs breadcrumbs={breadcrumbs} className="mb-7 text-center "/>
            <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-7 text-center " />

            <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full ">
              <div className="w-full grid grid-cols-1 gap-4 rounded-xl pt-6 ">
                {filteredBlogList.map((item, index) => (
                  <div key={index} className="gap-4 pb-5  group ">
                    <Link
                      title={item?.title || "Article Link"}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                    >
                      <div
                        className="flex-shrink-0 w-full h-[400px]" // Increase height of parent container
                      >
                        <div className="overflow-hidden relative h-full rounded-sm w-full bg-black">
                          <Image
                            title={
                              item.imageTitle ||
                              item.title ||
                              "Article Thumbnail"
                            }
                            alt={
                              item.altImage ||
                              item.tagline ||
                              "No Thumbnail Found"
                            }
                            src={
                              item.image
                                ? `${imagePath}/${item.image}`
                                : "/no-image.png"
                            }
                            fill={true}
                            loading="lazy"
                            className="w-full h-full object-cover absolute top-0 group-hover:scale-125 duration-1000 transition-all"
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="flex flex-col justify-center space-y-6 pt-6 ">
                     
                        <Link
                          href={`/${sanitizeUrl(
                            item.article_category
                          )}/${sanitizeUrl(item?.title)}`}
                          className="mt-2 lg:mt-0 font-bold text-2xl hover:text-primary1 text-inherit leading-tight underline-white transition-all text-white"
                        >

                          {item.title}
                        </Link>
                      <div className="flex gap-2 mt-1 ">
                        <p className="text-normal text-gray-500">written by</p>
                        <p className="text-normal text-gray-300">
                          {item.author}
                        </p>
                      </div>
                      <p className="text-gray-400 mt-2">{item.tagline}</p>
                      <Link
                        title={item?.title || "Article Link"}
                        href={`/${sanitizeUrl(
                          item.article_category
                        )}/${sanitizeUrl(item?.title)}`}
                        className="text-sm font-bold bg-button hover:bg-gray-300 py-3 px-4 w-44"
                      >
                        CONTINUE READING
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Rightbar
                about_me={about_me}
                tag_list={tag_list}
                blog_list={blog_list}
                imagePath={imagePath}
                categories={categories}
                contact_details={contact_details}
                widgets={layout?.widgets}
              />
            </div>
          </Container>
        </FullContainer>

        <Footer
          blog_list={blog_list}
          categories={categories}
          logo={logo}
          imagePath={imagePath}
          about_me={about_me}
          contact_details={contact_details}
          copyright={copyright}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
                })),
              },
              {
                "@type": "WebPage",
                "@id": `https://${domain}/${category}`,
                url: `https://${domain}/${category}`,
                name: meta?.title?.replaceAll("##category##", category),
                description: meta?.description?.replaceAll(
                  "##category##",
                  category
                ),
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "ItemList",
                url: `https://${domain}/${category}`,
                name: "blog",
                itemListElement: blog_list?.map((blog, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    url: `https://${domain}/${sanitizeUrl(
                      blog?.article_category.replaceAll(" ", "-")
                    )}/${sanitizeUrl(blog?.title)}`,
                    name: blog.title,
                  },
                })),
              },
            ],
          }}
        />
      </div>
    )
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
