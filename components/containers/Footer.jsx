import React, { useMemo } from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Link from "next/link";
import Logo from "./Navbar/Logo";
import { sanitizeUrl } from "@/lib/myFun";

// Popular Articles Component
const PopularArticles = ({ popularArticles }) => {
  if (!popularArticles || popularArticles.length === 0) return null;
  return (
    <div className=" bg-footer p-10 " >
      <p className=" text-normal text-white  mb-1 bg-primary1 p-2 w-32 ">Most Popular</p>
      {popularArticles.map((item, index) => (
        <Link
          href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
            item?.title
          )}`}
          title={item.imageTitle || "Title"}
          key={index}
        >
          <p className="text-sm py-3 text-white transition-all cursor-pointer border-b border-gray-500 hover:text-primary1 ">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};



// Footer Links Component
const FooterLinks = ({ categories }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };

  return (
    <div className="bg-footer p-10  " >
      <p className="text-lg font-semibold text-white  mb-8  ">USERFUL  LINKS</p>

    <div className="flex flex-row justify-between items-start gap-8 uppercase font-semibold">
      
      {/* Left column: Categories */}
      <div className="flex flex-col space-y-2 ">
        {categories?.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${sanitizeUrl(item.title)}`}
            className="text-sm text-gray-400 hover:text-primary1"
          >
            {item?.title}
          </Link>
        ))}
      </div>

      {/* Right column: Additional links */}
      <div className="flex flex-col space-y-2 text-gray-400 ">
        <Link title="About" href="/about" className="text-sm  hover:text-primary1">
          About Us
        </Link>
        <Link title="Contact Us" href="/contact" className="text-sm hover:text-primary1 ">
          Contact Us
        </Link>
        <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
          <a title="Sitemap" onClick={handleClick} className="text-sm hover:text-primary1 ">
            Sitemap
          </a>
        </Link>
      </div>
    </div>
    </div>

  );
};


export default function Footer({
  blog_list = [],
  categories = [],
  copyright,
  footer_text,
  logo,
  imagePath,
}) {
  // UseMemo to prevent unnecessary recalculations
  const popularArticles = useMemo(
    () => blog_list?.filter((item) => item.isPopular),
    [blog_list]
  );
  const latestPosts = useMemo(
    () => blog_list?.slice(-4).reverse(),
    [blog_list]
  );

  return (
    <footer className="flex items-center flex-col mt-16 ">
      <FullContainer className="bg-theme py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
            <PopularArticles popularArticles={popularArticles} />
            <div className="  bg-footer p-10    " >
              <Logo logo={logo} imagePath={imagePath} />
              <p className="mt-6 text-sm">{footer_text}</p>
            </div>
            <FooterLinks categories={categories} />
          </div>
        </Container>
      </FullContainer>

      <FullContainer className="py-10 bg-theme">
        <Container>
         
          <p className="text-sm mt-5 text-center text-white">{copyright}</p>
        </Container>
      </FullContainer>
    </footer>
  );
}
