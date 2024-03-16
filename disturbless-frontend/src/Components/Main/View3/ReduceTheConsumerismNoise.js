import React from "react";

import { Icon } from "@iconify/react";
import arrowCircleRightFill from "@iconify-icons/eva/arrow-circle-right-fill";
import baselineCancelScheduleSend from "@iconify-icons/ic/baseline-cancel-schedule-send";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import Card from "../../Card/Card";

const fullConfig = resolveConfig(tailwindConfig);

export function ReduceTheConsumerismNoise() {
  return <Card cardContent={<CardContent />} className="lg:mr-11" />;
}

function CardContent() {
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
      <div className="flex items-center" onClick={learnMoreOnClick}>
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

export function learnMoreOnClick() {
  let view4 = document.getElementById("view4");
  view4.scrollIntoView({ behavior: "smooth" });
}

