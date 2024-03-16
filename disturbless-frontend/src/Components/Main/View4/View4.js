import React from "react";

import * as Button from "../../Button/Button";
import Collapsible from "../../Collapsible/Collapsible";

export default function View3() {
  return (
    <div className="flex items-center min-h-screen" 
      data-aos="fade-up" 
      data-aos-duration="2000"
      id="view4">
      <div className="flex lg:flex-row flex-col flex-grow justify-between">
        <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
          <h6 className="text-gray text-lg font-sans leading-8">
            Starting your journey
          </h6>
          <h1 className="text-blue lg:leading-16 lg:text-5xl text-3xl font-sans font-bold mt-12">
            How does it work?
          </h1>
          <p className="mt-12 text-gray text-lg font-sans leading-8">
            Our technology allows you to get a virtual phone number in any
            country and use it to receive SMS & Voice Messages. These messages
            are forwarded to your email so you are not restricted by location.
          </p>
          <p className="mt-10 text-gray text-lg font-sans leading-8">
            Use the numbers below to test functionality of our service. Send an
            SMS or Voice Message to one of these numbers and watch messages
            appear. Exact senders and Verification codes are hidden for privacy
            and security.
          </p>
          <div className="mt-14 sm:block flex flex-col">
            <Button.Orange>See how it works</Button.Orange>
            <Button.Grey className="sm:ml-14 sm:mt-0 ml-0 mt-5">Get help</Button.Grey>
          </div>
        </div>
        <div className="lg:w-2/5 w-full lg:mt-0 mt-10">
          <h6 className="text-gray text-lg font-sans leading-8">
            As simple as 1, 2, 3.
          </h6>
          <div className="lg:mt-10 mt-6">
            <Collapsible
              title={getCollapsibleTitle(0)}
              paragraph={getCollapsibleParagraph(0)}
            />
            <Collapsible
              title={getCollapsibleTitle(1)}
              paragraph={getCollapsibleParagraph(1)}
              className="lg:mt-20 mt-6"
            />
            <Collapsible
              title={getCollapsibleTitle(2)}
              paragraph={getCollapsibleParagraph(2)}
              className="lg:mt-20 mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getCollapsibleTitle(index) {
  let data = [
    "1. Rent a Virtual Number",
    "2. Use Your Virtual Number",
    "3. Enjoy Convenience",
  ];

  if (index == undefined || index > data.length - 1) {
    return "";
  } else {
    return data[index];
  }
}

function getCollapsibleParagraph(index) {
  let data = [
    "Sign up and get a virtual number. You can get one with your country code and it will function just like a regular SIM card in your phone.",
    "Give out your virtual number to people & services. They will be able to send you SMS & Voice Messages.",
    "You will receive SMS & Voice Messages straight to your Email inbox. Conveniently wherever you are in the world.",
  ];

  if (index == undefined || index > data.length - 1) {
    return "";
  } else {
    return data[index];
  }
}
