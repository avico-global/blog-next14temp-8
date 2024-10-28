import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";

export default function MostPopular({ articles, imagePath }) {
  const popularArticles = articles?.filter((item) => item.isPopular);

  return (
    popularArticles?.length > 0 && (
      <div>
        <SectionHeading title="MOST POPULAR" />
        <div className="flex flex-col lg:flex-row gap-10 border border-gray-600 rounded-lg p-6  lg:p-10  mt-8">
          {/* Left Side: Display the first article */}
          {popularArticles[0] && (
            <Link
              href={`/${sanitizeUrl(
                popularArticles[0].article_category
              )}/${sanitizeUrl(popularArticles[0]?.title)}`}
              title={popularArticles[0].imageTitle || "IMAGE"}
              key={0}
              className="lg:w-2/3 flex flex-col gap-2 text-xl mb-5"
            >
              <div className="overflow-hidden relative h-80 w-full bg-gray-300 rounded-lg p-8  ">
                <Image
                  title={
                    popularArticles[0].imageTitle ||
                    popularArticles[0].title ||
                    "Article Thumbnail"
                  }
                  alt={
                    popularArticles[0].altImage ||
                    popularArticles[0].tagline ||
                    "No Thumbnail Found"
                  }
                  src={`${imagePath}/${popularArticles[0].image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 transition-transform duration-300 hover:scale-105"
                />
                <p className="bg-button backdrop-blur-sm uppercase text-xs text-center font-semibold text-white py-2 mt-6 px-4 rounded-full absolute top-0 mx-auto">
                  {popularArticles[0]?.article_category}
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-2 mt-1">
                  <p className="text-xs text-gray-300">
                    <span className="text-white text-xs">By</span>:{" "}
                    {popularArticles[0].author}
                  </p>
                  <span className="text-gray-200">--</span>
                  <p className="text-xs text-white">
                    {dayjs(popularArticles[0]?.published_at)?.format(
                      "MMM D, YYYY"
                    )}
                  </p>
                </div>
                <p className="font-bold text-2xl text-white text-inherit leading-tight hover:text-button">
                  {popularArticles[0].title}
                </p>
                <p className="font-normal text-white text-inherit leading-tight">
                  {popularArticles[0].tagline}
                </p>
              </div>
            </Link>
          )}

          {/* Right Side: Display the remaining articles */}
          <div className="flex flex-col lg:w-3/4 gap-6">
            {popularArticles.slice(1).map((item, index) => (
              <Link
                href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                  item?.title
                )}`}
                title={item.imageTitle || "IMAGE"}
                key={index + 1}
                className="flex gap-4 items-start"
              >
                <div className="relative w-40 h-40 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    title={item.imageTitle || item.title || "Article Thumbnail"}
                    alt={item.altImage || item.tagline || "No Thumbnail Found"}
                    src={`${imagePath}/${item.image}`}
                    fill={true}
                    loading="lazy"
                    className="w-full h-full object-cover absolute top-0 transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-white leading-tight hover:text-button">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-300">
                      <span className="text-gray-100 text-xs">By</span>:{" "}
                      {item.author}
                    </p>
                    <span className="text-gray-200">--</span>
                    <p className="text-xs text-gray-200">
                      {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
