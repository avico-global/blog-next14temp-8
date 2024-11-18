import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Banner({
  image,
  data,
  layout,
}) {
  return (
    <div className="relative h-[30vh] lg:h-[40vh] flex items-center justify-center text-white mt-3">
      {/* Background Image */}
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="w-full h-full object-cover"
        sizes="(max-width: 320px) 320px,
         (max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1280px) 1280px,
         (max-width: 1600px) 1600px,
         (max-width: 1920px) 1920px,
         (max-width: 2560px) 2560px,
         (max-width: 3840px) 3840px,
         100vw"
      />
      
      {/* Text Content */}
      <div className="absolute z-10 flex flex-col justify-center items-center text-center space-y-4 md:space-y-6 bg-black/60  px-12 lg:px-28 py-8 ">
        <h1 className={`${data.titleFontSize} font-bold capitalize  text-4xl  lg:text-6xl`}>
          {data.title}
        </h1>
        {data.tagline && (
          <p className={`${data.taglineFontSize} leading-tight  text-xl lg:text-3xl`}>
            {data.tagline}
          </p>
        )}
      </div>
    </div>
  );
}
