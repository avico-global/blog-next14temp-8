import React from "react";
import Head from "next/head";
import Footer from "@/components/containers/Footer";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Rightbar from "@/components/containers/Rightbar";

export default function Tags({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  contact_details,
  favicon,
  layout,
  tag_list,
  nav_type,
}) {
  const router = useRouter();
  const { category } = router.query;

  const breadcrumbs = useBreadcrumbs();

  const renderTags = () => (
    <div className="flex items-center flex-wrap w-full text-left gap-2">
      {tag_list.map((item, index) => (
        <Link
          key={index}
          title={item.tag}
          href={`/tags/${item.tag?.replaceAll(" ", "-").toLowerCase()}`}
          className="bg-theme text-gray-300  border border-gray-500  hover:border-button hover:text-button transition-all cursor-pointer rounded py-2 px-4 flex items-center gap-2"
        >
          {item.tag}
          {item.article_ids?.length > 1 && (
            <span className="bg-black text-white px-2 py-[1px] flex items-center justify-center w-fit h-fit text-sm rounded-full">
              {item.article_ids.length}
            </span>
          )}
        </Link>
      ))}
    </div>
  );

  const page = layout?.find((page) => page.page === "tags");

  return (
    <div>
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
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/tags`} />
        {/* <meta name="robots" content="noindex" /> */}
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    logo={logo}
                    nav_type={nav_type}
                    category={category}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs breadcrumbs={breadcrumbs} className="py-8" />
                    </Container>
                  </FullContainer>
                );
              case "tags":
                return (
                  <FullContainer key={index} className="mb-12">
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                        <div> {renderTags()}</div>
                        <Rightbar
                          about_me={about_me}
                          tag_list={tag_list}
                          blog_list={blog_list}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          widgets={page?.widgets}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                    key={index}
                    logo={logo}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    category={category}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/tags`,
              url: `https://${domain}/tags`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `https://${domain}${breadcrumb.url}`,
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, type: "logo" });

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
  const meta = await callBackendApi({ domain, query, type: "meta_tags" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo.data[0] || null,

      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
