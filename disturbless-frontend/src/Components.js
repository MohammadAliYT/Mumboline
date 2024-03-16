/* This is a test page that I have used to try rendering components, 
you'll find a mix of everything here */

import React, { useState } from "react";

/* Components */
import * as Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";
import Collapsible from "./Components/Collapsible/Collapsible";
import Testimonials from "./Components/Testimonials/Testimonials";
import Checkbox from "./Components/Checkbox/Checkbox";
import Popup from "./Components/Popup/Popup";
import Input, { InputPassword } from "./Components/Input/Input";
import MessageAnimation from "./Components/MessageAnimation/MessageAnimation";
import Footer from "./Components/Footer/Footer";
import { Switch } from "@material-ui/core";

/* Icons */
import { Icon } from "@iconify/react";
import baselineCancelScheduleSend from "@iconify-icons/ic/baseline-cancel-schedule-send";
import baselinePrivacyTip from "@iconify-icons/ic/baseline-privacy-tip";
import arrowCircleRightFill from "@iconify-icons/eva/arrow-circle-right-fill";
import { GoogleFill, LinkedInV1Fill } from "akar-icons";
import { FacebookOption } from "grommet-icons";
import twitterCircleFilled from "@iconify-icons/ant-design/twitter-circle-filled";
import facebookSquare from "@iconify-icons/fa-brands/facebook-square";

import emailIcon from "@iconify-icons/carbon/email";
import lockIcon from "@iconify-icons/codicon/lock";

/* Assets */
import heroImg from "./Assets/UnDraw 1.webp";
import whatIsDisturblessImg from "./Assets/UnDraw2.webp";
import noPhoneNumberImg from "./Assets/MessagingNoNumbers 1.webp";
import iPhoneImg from "./Assets/iPhone.webp";
import downloadOnTheAppStore from "./Assets/DownloadOnTheAppStore.webp";
import downloadOnGooglePlay from "./Assets/DownloadOnGooglePlay.webp";

import { getTestimonials } from "./DataGrabber";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import MultiPagesTable from "./Components/MultiPagesTable/MultiPagesTable";
import NumbersTable from "./Components/NumbersTable/NumbersTable";
const fullConfig = resolveConfig(tailwindConfig);

// import PropTypes from "prop-types";

export default function Components() {
  let [popupOpen, togglePopup] = useState(false);

  return (
    <div>
      <div className={"mt-5 max-w-mac mx-auto"}>
        <div className="text-gray text-2xl font-sans font-bold">MumboLine</div>
        <div className="m-5"></div>
        {/*Spacer*/}
        <div className="text-blue text-2xl font-sans font-medium">Home</div>
        <div className="m-5"></div>
        {/*Spacer*/}
        <div className="text-gray text-2xl font-sans font-Medium">
          Vote for features
        </div>
        <div className="m-5"></div>
        {/*Spacer*/}
        {drawHeadings()}
        <div className="m-5"></div>
        {/*Spacer*/}
        <p className="text-gray text-lg font-sans">
          With MumboLine you get a private virtual phone number and all SMS &
          Voice messages are forwarded to your Email or primary phone number
          selectively.
        </p>
        <div className="m-5"></div>
        {/*Spacer*/}
        <Button.Orange>See how it works</Button.Orange>
        <div className="m-5"></div>
        {/*Spacer*/}
        <Button.Grey>My dashboard</Button.Grey>
        <div className="m-24"></div>
        {/*Spacer*/}
        <div className="flex justify-center">
          <div className="flex">
            <Card cardContent={<CardContent1 />} className="mr-11" />
            <Card cardContent={<CardContent2 />} className="ml-11" />
          </div>
        </div>
        <div className="mt-10"></div>
        {/*Spacer*/}
        <Collapsible
          title="2. Use Your Virtual Number"
          paragraph={getCollapsibleText()}
        />
        <div className="m-5"></div>
        {/*Spacer*/}
        <Testimonials testimonials={getTestimonials()} />
        <div className="m-28"></div>
        {/*Spacer*/}
        <Button.Orange onClick={() => togglePopup(true)}>
          Open popup
        </Button.Orange>
        <Popup render={popupOpen} toggleRender={togglePopup}>
          {getPopupContent()}
        </Popup>
        <div className="m-28"></div>
        {/*Spacer*/}
        <div className="bg-blue rounded-full h-48 w-48 -ml-28 overflow-hidden"></div>
        <div className="bg-orange rounded-full h-48 w-48 -ml-28 overflow-hidden"></div>
        {/*Spacer*/}
        <div className="m-28"></div>
        <div className="flex">
          <div className="w-12 overflow-hidden">
            <div className="w-96 h-96 rounded-full bg-blue"></div>
          </div>
          <div className="w-12 overflow-hidden transform rotate-180">
            <div className="w-96 h-96 rounded-full bg-blue"></div>
          </div>
        </div>
        <MessageAnimation />
        {/*Spacer*/}
        <div className="m-28"></div>
        <Switch size="small" color="primary" />
        {/*Spacer*/}
        <div className="m-28"></div>
        <div className="flex">
          <Icon
            icon={twitterCircleFilled}
            color="#A1A1A1"
            width={24}
            height={24}
          />
          <Icon icon={facebookSquare} color="#A1A1A1" width={24} height={24} />
          <LinkedInV1Fill color="#A1A1A1" />
        </div>
        {/*Spacer*/}
        <div className="m-28"></div>
        <img src={heroImg} alt="Guy with an envelope illustration" />
        <img
          src={whatIsDisturblessImg}
          alt="Guy who appears to be distracted illustration"
        />
        <img src={noPhoneNumberImg} alt="No phone number illustration" />
        <img src={iPhoneImg} alt="iOS App Messaging example" />
        <div className="flex items-center">
          <img
            src={downloadOnTheAppStore}
            alt="Download on the App Store"
            className="h-10"
          />
          <img src={downloadOnGooglePlay} alt="Download on Google Play" />
        </div>
      </div>
      {/*Spacer*/}
      <div className="m-28"></div>
      <div className="max-w-4xl">
        <MultiPagesTable
          title="test"
          tableHeads={["test", "test"]}
          rows={[
            ["test1", "test2"],
            ["test3", "test4"],
            ["test5", "test6"],
            ["test7", "test8"],
            ["test9", "test10"],
            ["test11", "test12"],
            ["test13", "test14"],
            ["test15", "test16"],
            ["test17", "test18"],
            ["test19", "test20"],
            ["test21", "test22"],
            ["test23", "test24"],
            ["test25", "test26"],
            ["test27", "test28"],
            ["test29", "test30"],
            ["test31", "test32"],
            ["test33", "test34"],
            ["test35", "test36"],
            ["test37", "test38"],
            ["test39", "test40"],
            ["test41", "test42"],
            ["test43", "test44"],
            ["test45", "test46"],
            ["test47", "test48"],
            ["test49", "test50"],
            ["test51", "test52"],
            ["test53", "test54"],
            ["test55", "test56"],
            ["test57", "test58"],
            ["test59", "test60"],
            ["test61", "test62"],
            ["test63", "test64"],
            ["test65", "test66"],
            ["test67", "test68"],
            ["test69", "test70"],
          ]}
        />
      </div>
      {/*Spacer*/}
      <div className="m-28"></div>
      <div className="max-w-4xl">
        <NumbersTable initialNumbers={["1", "2", "3"]} />
      </div>
      {/*Spacer*/}
      <div className="m-28"></div>
      <Footer />
    </div>
  );
}

function getCollapsibleText() {
  return "Give out your virtual number to people & services. They will be able to send you SMS & Voice Messages.";
}

function drawHeadings() {
  return (
    <>
      <h1 className="text-blue text-5xl font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h1>
      <h2 className="text-blue text-4xl font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h2>
      <h3 className="text-blue text-3xl font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h3>
      <p className="text-blue text-1.75base font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </p>
      <h4 className="text-blue text-2xl font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h4>
      <h5 className="text-blue text-xl font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h5>
      <h6 className="text-blue text-lg font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </h6>
      <p className="text-blue text-base font-sans font-bold">
        Receive SMS & Voice Messages to Your Email
      </p>
    </>
  );
}

function CardContent1() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-blue text-xl font-sans font-medium">
          Reduce the consumerism noise
        </h3>
        <Icon
          icon={baselineCancelScheduleSend}
          color={fullConfig.theme.colors.blue.DEFAULT}
          width="36"
          height="32"
        />
      </div>
      <p className="text-gray text-sm font-sans mb-7">
        A second number is a great way to protect your privacy online. Online
        services often require your cell phone number during registration. To
        prevent special offers, promotional codes, and other marketing texts
        from cluttering up your main phone number, give the less important sites
        or apps your second number.
      </p>
      <div className="flex items-center">
        <p className="text-blue text-sm font-medium font-sans">Learn more</p>
        <Icon
          icon={arrowCircleRightFill}
          width="24"
          height="24"
          color={fullConfig.theme.colors.orange.DEFAULT}
          className="ml-4"
        />
      </div>
    </div>
  );
}

function CardContent2() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-blue text-xl font-sans font-medium">
          Protect your privacy online
        </h3>
        <Icon
          icon={baselinePrivacyTip}
          color={fullConfig.theme.colors.blue.DEFAULT}
          width="36"
          height="32"
        />
      </div>
      <p className="text-gray text-sm font-sans mb-7">
        As another example, take dating. Many online dating services let you
        chat anonymously through their apps, but eventually, most people either
        stop talking or decide to swap numbers. If you reach this point but
        you&apos;re still not sure you can trust a potential partner, a
        secondary number will let you keep more distance from them.
      </p>
      <div className="flex items-center">
        <p className="text-blue text-sm font-medium font-sans">Learn more</p>
        <Icon
          icon={arrowCircleRightFill}
          width="24"
          height="24"
          color={fullConfig.theme.colors.orange.DEFAULT}
          className="ml-4"
        />
      </div>
    </div>
  );
}

function getPopupContent() {
  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <h3 className="text-blue text-2xl font-sans font-bold text-center pt-10">
        Sign in to MumboLine
      </h3>
      <h5 className="text-gray text-lg font-sans text-center pt-5">
        Login here using your email and password
      </h5>
      <form className="px-10">
        <h6 className="text-gray text-sm font-sans pt-10 pb-5">Your email</h6>
        <Input
          placeholder={"example@company.com"}
          InputIcon={
            <Icon
              icon={emailIcon}
              color={fullConfig.theme.colors.gray.DEFAULT}
              width={24}
              height={24}
              className="absolute top-3 left-5"
            />
          }
        />
        <h6 className="text-gray text-sm font-sans pt-6 pb-5">Your password</h6>
        <InputPassword
          placeholder={"Password"}
          InputIcon={
            <Icon
              icon={lockIcon}
              color={fullConfig.theme.colors.gray.DEFAULT}
              width={17}
              height={24}
              className="absolute top-3 left-5"
            />
          }
        />
        <div className={"flex mt-10"}>
          <Checkbox
            className="ml-3"
            checkboxName={"rememberme"}
            labelText={"Remember me?"}
          />
          <h6 className={"ml-auto text-gray text-sm font-medium font-sans"}>
            Forgot password?
          </h6>
        </div>
        <Button.Orange
          paddingClasses={["py-4", "w-full", "mt-6"]}
          textSizeClass={"text-sm"}
        >
          Login
        </Button.Orange>
        <h6
          className={
            "text-gray text-center text-sm font-regular font-sans mt-8"
          }
        >
          Or sign in with
        </h6>
        <div className="flex justify-center mt-4">
          <div className="mr-2.5 btn-grey-bg btn-shadow rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 cursor-pointer">
            <GoogleFill color={"#4285F4"} />
          </div>
          <div className="ml-2.5 btn-grey-bg btn-shadow rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 cursor-pointer">
            <FacebookOption color="#4267B2" />
          </div>
        </div>
        <h6
          className={
            "text-gray text-center text-sm font-regular font-sans mt-4"
          }
        >
          Not registered? <span className="font-bold">Sign up here</span>
        </h6>
      </form>
    </div>
  );
}
