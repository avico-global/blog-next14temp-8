import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ articles, imagePath }) {
  const mustReadArticles = articles?.filter((item) => item.isMustRead);

  return (
    mustReadArticles?.length > 0 && (
      <div>
        <SectionHeading title="MUST READ"  />
        <div className="lg:flex lg:flex-col gap-6  border border-gray-500  p-4  mt-8 lg:p-10">
          {mustReadArticles?.map((item, index) => (
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.imageTitle || "IMAGE"}
              key={index}
              className="lg:flex  gap-4 items-center w-full "
            >
              <div className="relative  lg:w-80 h-64   rounded-lg overflow-hidden bg-gray-300 flex-shrink-0 p-8">
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full  h-full object-cover absolute top-0 transition-transform duration-300 hover:scale-105 "
                />
                <p className="bg-button  backdrop-blur-sm uppercase text-xs text-center font-semibold text-white py-2 px-4 rounded-full  absolute mx-auto">
                  {item?.article_category}
                </p>
              </div>
              <div className=" justify-center space-y-4 pb-10 lg:pb-0   ">
                <div className="flex gap-2 mt-1 ">
                  <p className=" text-sm lg:text-normal text-gray-300">{item.author}</p>
                  <span className="text-button font-extrabold ">.</span>
                  <p className="text-sm lg:text-normal text-gray-300">
                    {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                  </p>
                </div>
                <p className="font-bold text-sm lg:text-lg  leading-tight  text-white hover:text-button">

                  {item.title}
                </p>
                <p className="font-normal  text-sm lg:text-lg leading-tight  text-gray-400">
                  {item.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}
