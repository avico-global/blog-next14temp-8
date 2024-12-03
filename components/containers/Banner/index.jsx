import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

export default function Banner({ image, data }) {
  return (
    <FullContainer className="mx-auto overflow-hidden text-center">
      <Image
        src={image}
        title={data.imageTitle || data.title || "Banner"}
        alt={data.altImage || data.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="w-full absolute top-0"
        style={{ objectFit: "cover" }}
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
      <Container
        className="gap-5 p-5 md:p-12 lg:py-24 z-10 w-full min-h-screen md:min-h-[40vh]"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
          color: data.textColor || "white",
        }}
      >
        <h1
          style={{ fontSize: data.titleFontSize || 48 }}
          className="font-bold capitalize max-w-screen-lg leading-tight"
        >
          {data.title}
        </h1>
        {data.tagline && (
          <p
            style={{ fontSize: data.taglineFontSize || 18 }}
            className="leading-tight max-w-screen-md"
          >
            {data.tagline}
          </p>
        )}
      </Container>
    </FullContainer>
  );
}
