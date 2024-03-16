import React from "react";

import MessageAnimation from "../../MessageAnimation/MessageAnimation";
import Testimonials from "../../Testimonials/Testimonials";

import { getTestimonials } from "../../../DataGrabber";

export default function View5() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:mt-0 mt-10" data-aos="fade-up" data-aos-duration="2000">
      <MessageAnimation />
      <Testimonials testimonials={getTestimonials()} className="mt-3 lg:mt-10" />
    </div>
  );
}
