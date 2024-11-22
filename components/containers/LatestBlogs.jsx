import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { useRouter } from "next/router";

export default function LatestBlogs({ articles, imagePath }) {
  const router = useRouter();
  const handleNavigation = (page) => {
    router.push(page);
  };

  return (
    <div>
      <div className="grid grid-cols-1 space-y-4 lg:space-y-0 lg:grid-cols-2 gap-x-4 ">
        {articles
          ?.slice(-2) // Show only the top 2 articles (the last two in the array)
          ?.reverse() // Reverse the order to show the most recent first
          ?.map((item, index) => (
            <div
              onClick={() =>
                handleNavigation(
                  `/${encodeURI(
                    sanitizeUrl(item.article_category)
                  )}/${encodeURI(sanitizeUrl(item.title))}`
                )
              }
              key={index}
              className={`relative flex flex-col cursor-pointer text-lg ${
                index < 2 ? "lg:flex-col" : "lg:flex-row"
              } ${
                index === 0
                  ? "lg:h-[300px]"
                  : index === 1
                  ? "lg:h-[300px]"
                  : "lg:h-auto"
              }`}
            >
              <div
                className={` group relative overflow-hidden w-full  rounded-sm flex items-center p-2 ${
                  index < 2
                    ? "h-[300px] lg:h-[300px]"
                    : "min-h-40 lg:min-h-20 lg:w-1/3"
                }`}
              >
                {/* Image */}
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 group-hover:scale-125 transition-all duration-1000   "
                  style={{ objectFit: "cover" }}
                />

                {/* Text content positioned above image at the bottom-left */}
                <div className="absolute bottom-0 left-0 p-6  from-black to-transparent w-full">
                  <p className="uppercase text-xs font-semibold text-white py-2 rounded-full">
                    {item?.article_category}
                  </p>
                  <Link
                    title={item.title}
                    href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                      item?.title
                    )}`}
                    className="font-bold text-white  text-xl lg:text-3xl mt-2 hover:text-primary1 underline-white  "
                  >
                    {item.title}
                  </Link>

                  {/* Author and Date */}
                  <div className="flex items-center text-white justify-start gap-2 mt-4">
                    <p className="text-xs">
                      <span className="text-gray-400 text-xs">By</span>:{" "}
                      {item.author}
                    </p>
                    <span className="text-gray-200"> | </span>
                    <p className="text-xs text-gray-400">
                      {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
