import { ChevronRight, Circle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function Rightbar({
  category,
  imagePath,
  about_me = {},
  tag_list = [],
  blog_list = [],
  categories = [],
}) {
  const content = md.render(about_me.value || "");
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;
  const lastFiveBlogs = blog_list.slice(-5);
  const popularPosts = blog_list.filter((post) => post.isPopular); // Assuming there's an isPopular property

  // State to track which section to display
  const [showPopular, setShowPopular] = useState(false);

  const renderAbout = () => (
    <Link
      title="About"
      href="/about"
      className="bg-theme rounded-lg overflow-hidden "
    >
      <div className=" rounded-lg ">
        <div className="relative overflow-hidden rounded w-full h-[150px]">
          <Image
            src={`${imagePath}/${about_me.file_name}`}
            title="About Thumbnail"
            alt="Thumbnail Not Found"
            priority
            width={241}
            height={150}
            loading="eager"
            className="-z-10 object-cover min-w-full min-h-full"
          />
          <div className="absolute inset-0  flex flex-col justify-center text-center p-4  font-bold text-white  text-xl bg-black bg-opacity-20">
            <h3 className=" lg:text-3xl font-semibold ">About</h3>
          </div>
        </div>
        <div
          className="mt-3 text-white text-center"
          dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
        />
      </div>
    </Link>
  );

  const renderCategories = () => (
    <div className="bg-theme rounded-lg overflow-hidden shadow-lg ">
      <div className="shadow-sm px-7 mb-3 font-semibold text-xl py-6 text-white capitalize ">
        CATEGORIES
      </div>
      <div className="flex flex-col w-full text-left px-3 pb-5">
        {categories?.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${encodeURI(sanitizeUrl(item.title))}`}
            className={cn(
              "text-white capitalize w-full flex items-center justify-between gap-2 hover:text-primary1 transition-all p-2 ",
              (category === item?.title || isActive(`/${item?.title}`)) &&
                " text-primary1"
            )}
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="w-7 h-5" />
              {item?.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderTags = () => (
    <div className="bg-theme overflow-hidden shadow-lg  ">
      <div className="shadow-sm   py-2 px-4 font-semibold text-white  text-2xl capitalize">
        Tag Clouds
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {tag_list?.slice(0, 10)?.map((item, index) => (
            <Link
              key={index}
              title={item.tag}
              href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
              className="bg-thene text-gray-400  border border-gray-600  hover:text-primary1 hover:border-primary1 transition-all cursor-pointer py-2 text-sm px-2"
            >
              {item.tag}
              {item.article_ids?.length > 1 && (
                <span className="bg-black text-white px-1 ml-1 text-sm rounded-full">
                  {item.article_ids.length}
                </span>
              )}
            </Link>
          ))}
        </div>
        <Link
          title="Click to see all tags"
          href="/tags"
          className="underline font-bold text-gray-500 hover:text-primary1"
        >
          Click To See All Tags
        </Link>
      </div>
    </div>
  );

  const renderLatestPosts = () => (
    <div className=" rounded-lg overflow-hidden shadow-lg">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowPopular(false)}
          className={`py-2  px-12 lg:px-16 ${
            !showPopular
              ? "bg-mustRead text-primary1 font-bold border border-gray-700"
              : "bg-gray-800 text-white border border-gray-600"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setShowPopular(true)}
          className={`py-2  px-12 lg:px-16  ${
            showPopular
              ? "bg-button text-white"
              : "bg-theme text-white border border-gray-600"
          }`}
        >
          Popular
        </button>
      </div>

      <div className="p-2">
        {lastFiveBlogs
          ?.reverse()
          .slice(0, 4)
          .map((item, index) => (
            <Link
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              key={index}
              title={item.article_category}
              className="grid grid-cols-4 p-2 hover:shadow-md border border-transparent transition-all gap-4 group"
            >
              <div className="overflow-hidden relative col-span-2 h-24 bg-black  rounded-sm ">
                <Image
                  title={item?.imageTitle || "Article Thumbnail"}
                  src={
                    item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  fill={true}
                  loading="lazy"
                  alt="blog"
                  className="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-transform"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p className="font-bold text-white leading-tight hover:text-primary1 ">
                  {item?.title.slice(0, 50)}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-between text-gray-400 text-xs">
                  <p className="whitespace-nowrap">{item?.published_at}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );

  const renderPopularPosts = () => (
    <div className=" overflow-hidden shadow-lg">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowPopular(false)}
          className={`py-2 px-12 lg:px-16 ${
            !showPopular
              ? "bg-black text-white"
              : "bg-black text-white border border-gray-600"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setShowPopular(true)}
          className={`py-2  px-12 lg:px-16 ${
            showPopular
              ? "bg-mustRead text-primary1 font-bold border border-gray-700"
              : "bg-gray-800 text-white border border-gray-600"
          }`}
        >
          Popular
        </button>
      </div>

      <div className="p-2">
        {popularPosts.length > 0 ? (
          popularPosts.slice(0, 4).map((item, index) => (
            <Link
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              key={index}
              title={item.article_category}
              className="grid grid-cols-4 p-2 rounded-md hover:shadow-md border border-transparent transition-all gap-4 group"
            >
              <div className="overflow-hidden relative col-span-2 h-24 bg-black rounded-sm">
                <Image
                  title={item?.imageTitle || "Article Thumbnail"}
                  src={
                    item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  fill={true}
                  loading="lazy"
                  alt="blog"
                  className="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-transform"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p className="font-bold text-white leading-tight hover:text-primary1 ">
                  {item?.title.slice(0, 50)}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-between text-gray-400 text-xs">
                  <p className="whitespace-nowrap">{item?.published_at}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No popular posts available.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-0 flex flex-col gap-14 pt-6 ">
      {renderAbout()}
      {categories.length > 0 && renderCategories()}
      {tag_list?.length > 0 && renderTags()}
      {showPopular ? renderPopularPosts() : renderLatestPosts()}
    </div>
  );
}
