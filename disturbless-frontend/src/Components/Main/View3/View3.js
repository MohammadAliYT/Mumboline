import React from "react";

import { ProtectYourPrivacyOnline } from "./ProtectYourPrivacyOnline";
import { ReduceTheConsumerismNoise } from "./ReduceTheConsumerismNoise";

export default function View3() {
  return (
    <div
      className="flex items-center min-h-screen relative"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="flex flex-col flex-grow items-center">
        <h6 className="text-gray text-lg font-sans leading-8">
          Discover the benefits
        </h6>
        <h1 className="text-blue lg:leading-16 lg:text-5xl text-3xl font-sans font-bold mt-3">
          MumboLine can help
        </h1>
        <div className="flex lg:flex-row flex-col flex-wrap lg:flex-nowrap mt-8 lg:mt-28 mb-7 lg:mb-0">
          <ReduceTheConsumerismNoise />
          <ProtectYourPrivacyOnline />
        </div>
      </div>
      <div
        className="absolute -right-1/10 top-8/9 transform translate-x-1/2 
      bg-blue rounded-full h-48 w-48 -ml-28 overflow-hidden lg:block hidden"
      ></div>
      <div
        className="absolute -right-1/10 top-13/20 transform translate-x-1/2 
      bg-orange rounded-full h-48 w-48 -ml-28 overflow-hidden lg:block hidden"
      ></div>
      <div className="absolute -left-3/20 top-13/20 transform -rotate-45 hidden lg:flex">
        <div className="w-12 overflow-hidden">
          <div className="w-96 h-96 rounded-full bg-blue"></div>
        </div>
        <div className="w-12 overflow-hidden transform rotate-180">
          <div className="w-96 h-96 rounded-full bg-blue"></div>
        </div>
      </div>
    </div>
  );
}
