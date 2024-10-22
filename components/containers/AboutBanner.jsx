import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";

export default function AboutBanner({ image }) {
  return (
    <FullContainer className="h-80 overflow-hidden p-10 bg-black/20 text-white text-center">
      <Image
        title="About"
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
      <Container className="gap-6">
        <h1 className="font-extrabold text-6xl capitalize max-w-screen-md">
          About Me
        </h1>
      </Container>
    </FullContainer>
  );
}
