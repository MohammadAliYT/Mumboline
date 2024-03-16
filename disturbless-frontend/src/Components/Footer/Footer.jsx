// Footer found in the home page
import React from "react";

/* Icons */
import { Icon } from "@iconify/react";
import twitterCircleFilled from "@iconify-icons/ant-design/twitter-circle-filled";
import facebookSquare from "@iconify-icons/fa-brands/facebook-square";
import { LinkedInV1Fill } from "akar-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className="flex justify-center relative"
      style={{ backgroundColor: "#363C4D" }}
    >
      <div className="max-w-mac flex lg:flex-row flex-col justify-center py-10 lg:px-0 px-10">
        <div className="lg:w-2/5 lg:mr-28">
          <h4 className="text-gray-footer text-2xl font-sans font-bold">
            MumboLine
          </h4>
          <h6 className="text-gray-footer text-sm font-sans pt-10">
            MumboLine is a service that lets you to rent a virtual phone number
            and use it to receive SMS and voicemail messages
          </h6>
          <h6 className="text-gray-footer text-sm font-sans pt-12">
            © 2021 MumboLine
          </h6>
        </div>
        <div className="lg:mr-28 lg:mt-0 mt-5">
          <h4 className="text-gray-footer text-lg font-sans">Support</h4>
          <h6 className="text-gray-footer text-sm font-sans pt-4">FAQ</h6>
        </div>
        <div className="lg:mr-28 lg:mt-0 mt-5">
          <h4 className="text-gray-footer text-lg font-sans">Legal</h4>
          <h6 className="text-gray-footer text-sm font-sans pt-4">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </h6>
          <h6 className="text-gray-footer text-sm font-sans pt-4">
            Terms of use
          </h6>
        </div>
        <div>
          <h4 className="text-gray-footer text-lg font-sans lg:mt-0 mt-5">
            Social Media
          </h4>
          <div className="flex pt-4">
            <Icon
              icon={twitterCircleFilled}
              color="#A1A1A1"
              width={24}
              height={24}
              className="mr-4"
            />
            <Icon
              icon={facebookSquare}
              color="#A1A1A1"
              width={24}
              height={24}
              className="mr-4"
            />
            <LinkedInV1Fill color="#A1A1A1" className="mr-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
