import React from "react";

import whatIsDisturblessImg from "../../../Assets/UnDraw2.webp";

export default function View2() {
  return (
    <div
      className="flex items-center min-h-screen"
      data-aos="fade-up"
      data-aos-duration="2000"
      id="view2"
    >
      <div className="flex lg:flex-row flex-col items-center">
        <div className="lg:w-7/12">
          <h6 className="text-gray text-lg leading-8 font-sans">
            What is MumboLine?
          </h6>
          <h1 className="text-blue lg:leading-16 lg:text-5xl text-3xl font-sans font-bold mt-3">
            Gain access to a private phone number that you can use online for
            registrations!
          </h1>
          <p className="text-gray text-lg leading-8 font-sans lg:mt-14 mt-7">
            Think about any one-time occasion when people might have to text you
            or call you, but you don&apos;t really want to give out your main
            number. If you&apos;re organizing a wedding or going to a festival,
            you&apos;ll need to get in touch with lots of new contacts...but you
            might not want to give them your personal information.
          </p>
        </div>
        <div className="lg:my-0 my-8">
          <img
            src={whatIsDisturblessImg}
            alt="Guy who appears to be distracted illustration"
          />
        </div>
      </div>
    </div>
  );
}
