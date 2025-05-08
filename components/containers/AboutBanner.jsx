import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";

export default function AboutBanner({ image }) {
  return (
    <FullContainer className="relative">
      <Container className="gap-6 relative overflow-hidden h-[600px] text-white">
        {/* Image container */}
        <div className="absolute inset-0 z-10">
          <Image
            src={image}
            title="About Us"
            alt="About Us Banner Not Found"
            priority={true}
            fill={true}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text container - separate from image */}
        <div className="relative z-20">
          <h1 className="font-extrabold text-6xl capitalize max-w-screen-md">
            About Us
          </h1>
        </div>
      </Container>
    </FullContainer>
  );
}
