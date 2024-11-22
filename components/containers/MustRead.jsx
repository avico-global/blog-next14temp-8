import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ articles, imagePath }) {
  // Filter for must-read articles and take only the first three
  const mustReadArticles = articles?.filter((item) => item.isMustRead).slice(1, 4);

  return (
    mustReadArticles?.length > 0 && (
      <div>
        <div className="w-full text-left gap-2 mb-4 py-2 border-t border-gray-600 mt-6">
          <h2 className="font-bold uppercase text-2xl text-white w-40  -mt-6 bg-theme">
            Must Read
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6    ">
          {mustReadArticles.map((item, index) => (
            <div

             
              title={item.imageTitle || "IMAGE"}
              key={index}
              className="w-full group "
            >
              <div className="relative w-full h-64  overflow-hidden bg-gray-300">
                <Image
                  title={item.imageTitle || item.title || "Article Thumbnail"}
                  alt={item.altImage || item.tagline || "No Thumbnail Found"}
                  src={`${imagePath}/${item.image}`}
                  fill={true}
                  loading="lazy"
                  className="w-full h-full object-cover absolute top-0 transition-transform duration-1000 group-hover:scale-125"
                />
              </div>
              <div className=" space-y-2 bg-mustRead  py-8 px-4 ">
                <p className="uppercase text-gray-400 text-xs font-semibold ">
                  {item?.article_category}
                </p>
                <Link
                 href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                  item?.title
                )}`}
                title={item.title}
                className="font-bold text-sm lg:text-lg leading-tight text-white hover:text-primary1 underline-white">
                  {item.title}
                </Link>
                <div className="flex justify-start gap-2 mt-1 text-gray-300 text-sm">
                  <p className="hover:text-primary1">{item.author}</p>
                  <span className=" font-extrabold"> | </span>
                  <p className=" text-gray-400 " >{dayjs(item?.published_at).format("MMM D, YYYY")}</p>
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
