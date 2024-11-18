import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function AllArticles({ articles, imagePath }) {
  return (
    articles?.length > 0 && (
      <div>
        <div
          className="w-full text-left gap-2 mb-4 py-2 border-t border-gray-600"
        >
          <h2 className="font-bold uppercase text-2xl text-white -mt-6 bg-theme">
            All Articles
          </h2>
        </div>
        <div className="lg:flex lg:flex-col gap-6">
          {articles.map((item, index) => (
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.imageTitle || "IMAGE"}
              key={index}
              className="lg:flex gap-4 items-center w-full border-b border-gray-800  "
            >
              <div className="relative lg:w-80 h-64  overflow-hidden bg-gray-300 flex-shrink-0 p-8 mb-4">
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="justify-center space-y-4 pb-10 lg:pb-0">
                <p className="uppercase text-primary1   text-xs font-semibold  rounded-full mx-auto">
                  {item?.article_category}
                </p>
                <p className="font-bold text-sm lg:text-lg leading-tight text-white hover:text-primary1">
                  {item.title}
                </p>
                <div className="flex gap-2 mt-1">
                  <p className="text-sm lg:text-normal hover:text-primary1 text-gray-300">
                    {item.author}
                  </p>
                  <span className="text-button font-extrabold">.</span>
                  <p className="text-sm lg:text-normal text-gray-300">
                    {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                  </p>
                </div>
                <p className="font-normal text-sm lg:text-lg leading-tight text-gray-400">
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
