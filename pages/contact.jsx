import React from "react";
import Head from "next/head";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Map from "@/components/containers/Map";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Contact2, MailOpen, MapIcon, Phone } from "lucide-react";
import {
  getDomain,
  robotsTxt,
  sanitizeUrl,
  getImagePath,
  callBackendApi,
} from "@/lib/myFun";

export default function Contact({
  categories,
  imagePath,
  nav_type,
  favicon,
  domain,
  logo,
  meta,
  blog_list,
  footer_type,
  contact_details,
  about_me,
  page,
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    page?.enable && (

    <div className="flex flex-col justify-between">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/contact`} />
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

      {/* Navbar Section */}
      <Navbar
        logo={logo}
        nav_type={nav_type}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        contact_details={contact_details}
      />

      {/* Breadcrumbs Section */}
      <FullContainer>
        <Container className="w-full py-28 bg-contact mb-10">
          <h1 className="text-5xl font-bold capitalize px-4 py-1 text-white">
            Contact Us
          </h1>
        </Container>
      </FullContainer>

      {/* Map Section */}
      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="  mt-3 mb-6 " />

          {contact_details?.mapDetails?.mapUrl ? (
            <LoadScript googleMapsApiKey="AIzaSyAPeJFoV41Bq2QOImPkf3Dai8hP6aZ7MFg">
              <GoogleMap
                mapContainerClassName="h-[500px] w-full rouded-md"
                center={contact_details?.mapDetails?.center}
                zoom={12}
              >
                <Marker position={contact_details?.mapDetails?.center} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <Map location="united states" />
          )}
        </Container>
      </FullContainer>

      {/* Contact Info Section */}
      <FullContainer>
        <Container className="flex lg:flex-row mt-10 text-center text-gray-500 text-xs gap-8">
          <div className="items-center justify-center w-full bg-footer p-10 rounded-xl border-gray-500 py-12 px-4 gap-3">
            <div className="flex justify-center">
              <Phone className="w-14 h-14 p-2 rounded-lg text-primary1" />
            </div>
            <p className="text-lg font-bold text-white">Phone Number</p>
            <p className="text-lg font-bold text-white">
              {contact_details?.phone}
            </p>
          </div>
          <div className="w-full items-center justify-center bg-footer p-10 rounded-xl border-gray-500 py-12 px-4 gap-3">
            <div className="flex justify-center">
              <MailOpen className="w-14 h-14 p-2 rounded-lg text-primary1" />
            </div>
            <p className="text-lg font-bold text-white">Email Address</p>
            <p className="text-lg font-bold text-white">
              {contact_details?.email}
            </p>
          </div>
          <div className="w-full items-center justify-center bg-footer p-10 rounded-xl border-gray-500 py-12 px-4 gap-3">
            <div className="flex justify-center">
              <MapIcon className="w-14 h-14 p-2 rounded-lg text-primary1" />
            </div>
            <p className="text-lg font-bold text-white">Office Location</p>
            <p className="text-lg font-bold text-white">
              {contact_details?.address}
            </p>
          </div>
        </Container>
      </FullContainer>

      {/* Footer Section */}
      <Footer
        about_me={about_me}
        logo={logo}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        footer_type={footer_type}
      />

      {/* JSON-LD Structured Data */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/contact`,
              url: `https://${domain}/contact`,
              name: meta?.title,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `https://${domain}`,
              },
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
    )
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });
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
  const about_me = await callBackendApi({ domain, query, type: "about_me" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "contact");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
