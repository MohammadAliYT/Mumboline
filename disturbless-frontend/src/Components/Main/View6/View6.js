import React from "react";

import iPhoneImg from "../../../Assets/iPhone.webp";
import downloadOnTheAppStore from "../../../Assets/DownloadOnTheAppStore.webp";
import downloadOnGooglePlay from "../../../Assets/DownloadOnGooglePlay.webp";

export default function View6() {
  return (
    <div className="flex sm:flex-row flex-col-reverse items-center justify-between min-h-view6 lg:mt-0 mt-10">
      <img
        src={iPhoneImg}
        alt="iOS App Messaging example"
        className="sm:w-2/5 sm:mt-0 w-3/5 mt-3 lg:-mb-60"
      />
      <div className="sm:w-1/2 w-full">
        <h1 className="text-blue lg:text-5xl text-3xl font-sans font-bold lg:leading-16 ">
          Try MumboLine today, for as little as 4.99$
        </h1>
        <p className="text-gray text-lg font-sans leading-8 mt-14">
          Take charge of your privacy and download our mobile app. Available for
          both Android and iOS.
        </p>
        <div className="flex items-center mt-10 sm:flex-nowrap flex-wrap">
          <img
            src={downloadOnTheAppStore}
            alt="Download on the App Store"
            className="h-10"
          />
          <img
            src={downloadOnGooglePlay}
            alt="Download on Google Play"
            className="-ml-2 sm:ml-0"
          />
        </div>
      </div>
    </div>
  );
}
