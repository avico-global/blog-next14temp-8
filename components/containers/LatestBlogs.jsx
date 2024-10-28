import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";
import ZigZagLine from "../common/ZigZagLine";

export default function LatestBlogs({ articles, imagePath }) {
  return (
    <div>
      <SectionHeading title="Latest Posts" className=" " />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 border border-gray-600 p-6 lg:p-10 mt-8">
        {articles
          ?.slice(-8)
          ?.reverse()
          ?.map((item, index) => (
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.imageTitle || "IMAGE"}
              key={index}
              className={`flex flex-col gap-2 text-lg ${
                index < 2 ? "lg:flex-col" : "lg:flex-row"
              } ${
                index === 0
                  ? "lg:h-[400px]"
                  : index === 1
                  ? "lg:h-[400px]"
                  : "lg:h-auto"
              }`}
            >
              <div
                className={`overflow-hidden relative w-full bg-gray-300 rounded-lg flex items-center p-8 ${
                  index < 2
                    ? "h-[300px] lg:h-[300px]"
                    : "min-h-40 lg:min-h-28 lg:w-1/3"
                }`}
              >
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 scale-105"
                />
                <p
                  className={`bg-button mt-6 backdrop-blur-sm uppercase text-xs text-center font-semibold text-white py-2  px-4 rounded-full  absolute top-0 mx-auto ${
                    index < 2 ? "flex" : "hidden"
                  }`}
                >
                  {item?.article_category}
                </p>
              </div>
              <div
                className={`flex flex-col justify-center space-y-4 ${
                  index < 2 ? "text-start  mt-2 lg:mt-2" : "lg:w-2/3 lg:pl-4"
                }`}
              >
                <p
                  className={`font-bold text-inherit leading-tight text-white hover:text-button  ${
                    index < 2 ? "text-2xl" : "text-normal "
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`font-light text-inherit leading-tight text-white ${
                    index < 2 ? "flex" : "hidden"
                  }`}
                >
                  {item.tagline}
                </p>

                <div className="flex items-center text-white justify-center lg:justify-start gap-2 mt-1">
                  <p className="text-xs">
                    <span className="text-white text-xs">By</span>:{" "}
                    {item.author}
                  </p>
                  <span className="text-gray-200">--</span>
                  <p className="text-xs text-gray-400">
                    {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
