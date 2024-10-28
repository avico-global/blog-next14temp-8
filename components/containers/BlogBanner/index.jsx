import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

export default function BlogBannerStyle8({ myblog, imagePath }) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, ${myblog?.opacity})`,
          color: myblog?.value?.textColor || "white",
        }}
      >
        <FullContainer
          className="overflow-hidden p-4  grid items-center  gap-8"
          style={{
            color: myblog?.value?.textColor || "white",
          }}
        >
          {/* Text Column */}
          <div className="flex flex-col justify-center items-center lg:items-start space-y-5 py-4  text-start ">
            <div className="flex flex-col gap-4 text-center justify-center items-center lg:items-start">
              <h1
                style={{ fontSize: myblog?.value?.titleFontSize || 36 }}
                className="font-bold capitalize max-w-screen-md text-white text-center lg:text-left"
              >
                {myblog?.value.title}
              </h1>
              <div className="text-gray-400 flex items-center justify-center lg:justify-start gap-4">
                <p className=" ">{myblog?.value?.author}</p>{" "}
                <span className=" text-button "> -- </span>{" "}
                <p>{myblog?.value.published_at}</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[800px] h-[300px] lg:max-w-[800px] lg:h-[500px]">
              <Image
                src={`${imagePath}/${myblog?.file_name}`}
                alt={
                  myblog?.value.imageAltText ||
                  myblog?.value?.tagline ||
                  "No Banner Found"
                }
                title={myblog?.value.imageTitle || myblog?.value.title}
                priority={true}
                fill={true}
                loading="eager"
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </FullContainer>
      </div>
    </>
  );
}
