import React from "react";

import noPhoneNumberImg from "../../../Assets/MessagingNoNumbers 1.webp";
import * as Button from "../../Button/Button";
import PropTypes from "prop-types";
import PageTitle from "../PageTitle/PageTitle";

export function NoNumbers(props) {
  const { heading } = props;

  NoNumbers.propTypes = {
    heading: PropTypes.string,
    setAddNumberPopupOpen: PropTypes.func,
  };
  return (
    <div className="text-center pt-24">
      <div className="mx-auto max-w-lg">
        <PageTitle
          pageTitle={heading}
          headingClassname={"lg:ml-0 text-blue text-3xl font-sans font-medium"}
          containerClassname="flex-grow"
        />
        <img
          src={noPhoneNumberImg}
          alt="No phone number illustration"
          className="mt-12"
        />
        <p className="text-gray text-lg font-sans">
          Seems like you haven’t added any phone number yet, begin your journey
          by renting a phone number from here:
        </p>
        <Button.Orange
          paddingClasses={["py-4", "w-full", "mt-6", "max-w-btn", "mt-12"]}
          textSizeClass={"text-2xl"}
          onClick={() => {
            location.assign("/dashboard/numbers");
          }}
        >
          Get Number
        </Button.Orange>
      </div>
    </div>
  );
}

export function NoMessages(props) {
  let { heading } = props;

  NoMessages.propTypes = {
    heading: PropTypes.string,
  };
  return (
    <div className="text-center pt-24">
      <div className="mx-auto max-w-lg">
        <PageTitle
          pageTitle={heading}
          headingClassname={"lg:ml-0 text-blue text-3xl font-sans font-medium"}
          containerClassname="flex-grow"
        />
        <img
          src={noPhoneNumberImg}
          alt="No phone number illustration"
          className="mt-12"
        />
        <p className="text-gray text-lg font-sans">
          Seems like you haven’t added any phone number yet, begin your journey
          by renting a phone number from here:
        </p>
        <Button.Orange
          paddingClasses={["py-4", "w-full", "mt-6", "max-w-btn", "mt-12"]}
          textSizeClass={"text-2xl"}
          onClick={() => {
            location.assign("/dashboard/numbers");
          }}
        >
          Get Number
        </Button.Orange>
      </div>
    </div>
  );
}
