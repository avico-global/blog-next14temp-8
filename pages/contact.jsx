import React from "react";
import Head from "next/head";

import Map from "@/components/containers/Map";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Font
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Contact2, MailOpen, MapIcon, Phone } from "lucide-react";

export default function Contact({
  categories,
  imagePath,
  nav_type,
  favicon,
  domain,
  logo,
  meta,
  layout,
  blog_list,
  footer_type,
  contact_details,
}) {
  const page = layout?.find((item) => item.page === "contact");
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="flex flex-col justify-between">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/contact`} />
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
            switch (item.section) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer
                    key={index}
                    className="w-full py-8 bg-gray-800 mb-10"
                  >
                    <h1 className="text-2xl font-semibold capitalize px-4 py-1 text-white">
                      Contact
                    </h1>
                    <div className="w-24 mt-2 h-1 bg-gray-500 "></div>
                    <Breadcrumbs
                      breadcrumbs={breadcrumbs}
                      className="mt-1 justify-center"
                    />
                  </FullContainer>
                );
              case "map":
                return (
                  <FullContainer key={index}>
                    <Container>
                      {contact_details?.mapDetails?.mapUrl ? (
                        <LoadScript
                          // googleMapsApiKey={process.env.NEXT_MAP_API_KEY}
                          googleMapsApiKey="AIzaSyAPeJFoV41Bq2QOImPkf3Dai8hP6aZ7MFg"
                        >
                          <GoogleMap
                            mapContainerClassName="h-[500px] w-full rouded-md"
                            center={contact_details?.mapDetails?.center}
                            zoom={12}
                          >
                            <Marker
                              position={contact_details?.mapDetails?.center}
                            />
                          </GoogleMap>
                        </LoadScript>
                      ) : (
                        <Map location="united states" />
                      )}
                    </Container>
                  </FullContainer>
                );
              case "contact info":
                return (
                  <FullContainer key={index}>
                    <Container className=" flex lg:flex-row  mt-10 text-center text-gray-500 text-xs gap-8">
                      <div className=" flex  items-center justify-center  border rounded-xl border-gray-500 py-6 px-4  gap-3">
                        <Phone className=" bg-button w-14 h-14 p-2 rounded-lg  text-white " />

                        <p className=" text-lg font-bold text-white  ">
                          {contact_details?.phone}
                        </p>
                      </div>
                      <div className=" flex  items-center justify-center  border rounded-xl border-gray-500 py-6 px-4  gap-3">
                        <MailOpen className=" bg-button w-14 h-14 p-2 rounded-lg  text-white " />

                        <p className=" text-lg font-bold text-white  ">
                          {contact_details?.email}
                        </p>
                      </div>
                      <div className=" flex  items-center justify-center  border rounded-xl border-gray-500 py-6 px-4  gap-3">
                        <MapIcon className=" bg-button w-14 h-14 p-2 rounded-lg  text-white " />

                        <p className=" text-lg font-bold text-white  ">
                          {contact_details?.address}
                        </p>
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
                    footer_type={footer_type}
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
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
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
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
