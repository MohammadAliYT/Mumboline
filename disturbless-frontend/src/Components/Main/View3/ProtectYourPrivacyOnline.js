import React from "react";

import { Icon } from "@iconify/react";
import arrowCircleRightFill from "@iconify-icons/eva/arrow-circle-right-fill";
import baselinePrivacyTip from "@iconify-icons/ic/baseline-privacy-tip";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import Card from "../../Card/Card";
import { learnMoreOnClick } from "./ReduceTheConsumerismNoise";

const fullConfig = resolveConfig(tailwindConfig);

export function ProtectYourPrivacyOnline() {
  return (
    <Card cardContent={<CardContent />} className="lg:ml-11 lg:mt-0 mt-8" />
  );
}

function CardContent() {
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
