/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from "react";
import Input from "../../Input/Input";
import PageTitle from "../PageTitle/PageTitle";
import { Icon } from "@iconify/react";
import emailIcon from "@iconify-icons/carbon/email";
import * as Button from "../../Button/Button";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { AppContext } from "../../../App";
import axios from "axios";
import EmailVerification from "./EmailVerification";

const fullConfig = resolveConfig(tailwindConfig);

export default function Profile() {
  const {
    appContextData: { dashboardProfileData },
  } = useContext(AppContext);

  const [email, setEmail] = useState(dashboardProfileData?.data?.username);
  const [addVerifyPopup, setAddVerifyPopup] = useState(false);
  const type = "email";
  const [verifying, setVerifying] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(dashboardProfileData?.data?.username);
  }, [dashboardProfileData]);

  async function handleVerify() {
    setResponse({});
    setError("");
    setVerifying(true);
    try {
      const res = await axios.post("/api/numbers/verifynew", {
        [type]: email,
      });
      setResponse(res.data);
      setAddVerifyPopup(true);
    } catch (error) {
      setError("Something went wrong");
    }
    setVerifying(false);
  }

  return (
    <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
      <PageTitle
        pageTitle={"Profile"}
        headingClassname={"text-blue text-4xl font-sans font-medium lg:ml-0"}
        useAsReturn={false}
      />
      <h2 className="font-medium font-sans text-blue text-lg mt-12">
        General information
      </h2>
      <h6 className="text-gray text-sm font-sans pt-10 pb-5">Your email</h6>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Input
            placeholder={"example@company.com"}
            value={email}
            setValue={(value) => {
              setEmail(value);
              const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
              const isValidEmail = emailRegex.test(value);
              if (isValidEmail) {
                setError("");
              } else {
                setError("Invalid email");
              }
            }}
            className="max-w-lg w-full"
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
          {error && <p className="text-red-400 text-sm mt-1 ml-4">{error}</p>}
          {email !== dashboardProfileData?.data?.username && (
            <span className="text-red-400 text-sm mt-1 ml-4">
              Verify your email
            </span>
          )}
        </div>
        <div>
          <Button.Grey
            disabled={!email || email === dashboardProfileData?.data?.username}
            textClasses="font-sans text-gray text-xs font-medium"
            paddingClasses="px-12 py-4"
            className="ml-auto"
            onClick={handleVerify}
          >
            Save
          </Button.Grey>
        </div>
      </div>
      <EmailVerification
        popup={addVerifyPopup}
        setPopup={setAddVerifyPopup}
        type={type}
        email={email}
      />
    </div>
  );
}
