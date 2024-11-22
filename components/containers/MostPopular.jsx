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
        <div className="lg:flex space-y-4 lg:space-y-0 gap-4 justify-center ">
          {/* Left Blog */}
          {popularArticles[0] && (
            <div
              title={popularArticles[0].imageTitle || "IMAGE"}
              key={0}
              className="flex flex-col gap-2 text-xl w-full sm:w-1/4"
            >
              <div className="relative h-48 lg:h-96 w-full bg-gray-300 rounded-lg overflow-hidden group">
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
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <p className="uppercase text-xs font-semibold text-white py-2">
                    {popularArticles[0]?.article_category}
                  </p>
                  <Link
                    title={popularArticles[0].title}
                    href={`/${sanitizeUrl(
                      popularArticles[0].article_category
                    )}/${sanitizeUrl(popularArticles[0]?.title)}`}
                    className="font-bold text-white  text-xl lg:text-2xl mt-2 hover:text-primary1 underline-white"
                  >
                    {popularArticles[0].title}
                  </Link>
                  <div className="space-y-5 mt-3">
                    <div className="flex items-start gap-2 mt-1">
                      <p className="text-xs text-gray-300">
                        <span className="text-white text-xs">By</span>:{" "}
                        {popularArticles[0].author}
                      </p>
                      <span className="text-gray-200"> | </span>
                      <p className="text-xs text-white">
                        {dayjs(popularArticles[0]?.published_at)?.format(
                          "MMM D, YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Middle Blog */}
          {popularArticles[1] && (
            <div
              title={popularArticles[1].imageTitle || "IMAGE"}
              key={1}
              className="flex flex-col gap-2 text-xl w-full sm:w-1/2"
            >
              <div className="relative h-48 lg:h-96 w-full bg-gray-300 rounded-lg overflow-hidden group">
                <Image
                  title={
                    popularArticles[1].imageTitle ||
                    popularArticles[1].title ||
                    "Article Thumbnail"
                  }
                  alt={
                    popularArticles[1].altImage ||
                    popularArticles[1].tagline ||
                    "No Thumbnail Found"
                  }
                  src={`${imagePath}/${popularArticles[1].image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <p className="uppercase text-xs font-semibold text-white py-2">
                    {popularArticles[1]?.article_category}
                  </p>
                  <Link
                    title={popularArticles[1].title}
                    href={`/${sanitizeUrl(
                      popularArticles[1].article_category
                    )}/${sanitizeUrl(popularArticles[1]?.title)}`}
                    className="font-bold text-white  text-xl lg:text-2xl mt-2 hover:text-primary1 underline-white"
                  >
                    {popularArticles[1].title}
                  </Link>
                  <div className="space-y-5 mt-3">
                    <div className="flex items-start gap-2 mt-1">
                      <p className="text-xs text-gray-300">
                        <span className="text-white text-xs">By</span>:{" "}
                        {popularArticles[1].author}
                      </p>
                      <span className="text-gray-200"> | </span>
                      <p className="text-xs text-white">
                        {dayjs(popularArticles[1]?.published_at)?.format(
                          "MMM D, YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Blog */}
          {popularArticles[2] && (
            <div
              title={popularArticles[2].imageTitle || "IMAGE"}
              key={2}
              className="flex flex-col gap-2 text-xl w-full sm:w-1/4"
            >
              <div className="relative h-52 lg:h-96 w-full bg-gray-300 rounded-lg overflow-hidden group">
                <Image
                  title={
                    popularArticles[2].imageTitle ||
                    popularArticles[2].title ||
                    "Article Thumbnail"
                  }
                  alt={
                    popularArticles[2].altImage ||
                    popularArticles[2].tagline ||
                    "No Thumbnail Found"
                  }
                  src={`${imagePath}/${popularArticles[2].image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <p className="uppercase text-xs font-semibold text-white py-2">
                    {popularArticles[2]?.article_category}
                  </p>
                  <Link
                    href={`/${sanitizeUrl(
                      popularArticles[2].article_category
                    )}/${sanitizeUrl(popularArticles[2]?.title)}`}
                    title={popularArticles[2].title}
                    className="font-bold text-white text-xl lg:text-2xl mt-2 hover:text-primary1 underline-white"
                  >
                    {popularArticles[2].title}
                  </Link>
                  <div className="space-y-5 mt-3">
                    <div className="flex items-start gap-2 mt-1">
                      <p className="text-xs text-gray-300">
                        <span className="text-white text-xs">By</span>:{" "}
                        {popularArticles[2].author}
                      </p>
                      <span className="text-gray-200"> | </span>
                      <p className="text-xs text-white">
                        {dayjs(popularArticles[2]?.published_at)?.format(
                          "MMM D, YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
