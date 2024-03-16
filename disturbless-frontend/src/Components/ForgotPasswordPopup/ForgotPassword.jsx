/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect, useRef } from "react";
import Popup from "../Popup/Popup";
import { MainContext } from "../Main/Main";
import axios from "axios";
import { InputNP, InputPassword } from "../Input/Input";
import { CircularProgress } from "@mui/material";
import * as Button from "../Button/Button";
import { isEmpty } from "../../Utils/isEmpty";
import PropTypes from "prop-types";
import lockIcon from "@iconify-icons/codicon/lock";
import { Icon } from "@iconify/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
const fullConfig = resolveConfig(tailwindConfig);

export default function ForgotPasswordPopUpOpen() {
  const { forgotPasswordPopup, setForgotPasswordPopup } =
    useContext(MainContext);
  return (
    <Popup render={forgotPasswordPopup} toggleRender={setForgotPasswordPopup}>
      <ForgotPasswordPopUpContent />
    </Popup>
  );
}

function ForgotPasswordPopUpContent() {
  const { forgotPasswordPopup, setForgotPasswordPopup } =
    useContext(MainContext);
  const [verifying, setVerifying] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({});
  const [input, setInput] = useState("");
  const [responseStatus, setResponseStatus] = useState("pending");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setInput("");
    setError("");
    setInputError({});
    setResponse({});
  }, [forgotPasswordPopup]);

  async function handleVerify() {
    setVerifying(true);
    setResponse({});
    setError("");
    try {
      const res = await axios.post("/forgotPassword", {
        username: input,
      });
      setResponse(res.data);
    } catch (error) {
      setError(error.response.data);
    }
    setVerifying(false);
  }

  async function handlePasswordChange() {
    setVerifying(true);
    setResponse({});
    setError("");
    try {
      const res = await axios.post("/resetPassword", {
        username: input,
        newPassword: password,
        status: responseStatus,
      });
      setResponse(res.data);
      setTimeout(() => {
        setForgotPasswordPopup(false);
      }, 1000);
    } catch (error) {
      setError("Something went wrong");
    }
    setVerifying(false);
  }
  return (
    <>
      {responseStatus === "pending" ? (
        <div className="btn-grey-bg btn-shadow rounded-5xl p-8">
          <h6 className="text-blue text-lg font-sans font-bold">
            Enter your Email
          </h6>
          {isEmpty(response) ? (
            <>
              <InputNP
                className="mt-6"
                name="email"
                placeholder="abc@example.com"
                value={input}
                setValue={(value) => {
                  setInput(value);
                  const emailRegex =
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                  const isValidEmail = emailRegex.test(value);
                  if (isValidEmail) {
                    setError("");
                  } else {
                    setError("Invalid email");
                  }
                }}
              />
              {error && (
                <p className="text-red-400 text-sm mt-1 ml-4">{error}</p>
              )}
              <div className="flex justify-evenly items-center mt-4">
                <Button.Grey
                  className="w-24"
                  paddingClasses="py-2"
                  textClasses="text-sm text-gray tracking-wide"
                  onClick={() => setForgotPasswordPopup(false)}
                >
                  Cancel
                </Button.Grey>
                <Button.Orange
                  className="w-24"
                  paddingClasses={["py-2"]}
                  textSizeClass={"text-sm"}
                  disabled={!input || Boolean(error) || verifying}
                  onClick={handleVerify}
                >
                  {verifying ? <CircularProgress size={20} /> : "Submit"}
                </Button.Orange>
              </div>
            </>
          ) : (
            <p className="font-sans text-gray text-center mt-4">
              {response.message}
            </p>
          )}
          {!verifying && !isEmpty(response) && (
            <OtpPopup
              to={response.to}
              setPopup={setForgotPasswordPopup}
              setResponseStatus={setResponseStatus}
            />
          )}
        </div>
      ) : (
        <div className="btn-grey-bg btn-shadow rounded-5xl p-8">
          <p className="text-blue text-lg font-sans text-center font-bold mb-4">
            Verification Successfull
          </p>
          <p className="text-sm text-gray font-sans font-bold mb-2">
            Create a new Password
          </p>
          <InputPassword
            placeholder="Enter New Password"
            setValue={(value) => {
              setPassword(value);
              if (value.length > 5) {
                setInputError({ ...inputError, password: "" });
              } else {
                setInputError({
                  ...inputError,
                  password: "Password should be greater than 6 digits",
                });
              }
            }}
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
          {inputError.password && (
            <span className="text-red-400 text-sm ml-6">
              {inputError.password}
            </span>
          )}
          <div className="mt-4">
            <InputPassword
              placeholder={"Confirm New Password"}
              setValue={(value) => {
                setPasswordConfirm(value);
                if (value === password) {
                  setInputError({ ...inputError, passwordConfirm: "" });
                } else {
                  setInputError({
                    ...inputError,
                    passwordConfirm: "Password should be same",
                  });
                }
              }}
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
            {inputError.passwordConfirm && (
              <span className="text-red-400 text-sm ml-6">
                {inputError.passwordConfirm}
              </span>
            )}
          </div>
          <div className="flex justify-evenly items-center mt-4">
            <Button.Grey
              className="w-24"
              paddingClasses="py-2"
              textClasses="text-sm text-gray tracking-wide"
              onClick={() => setForgotPasswordPopup(false)}
            >
              Cancel
            </Button.Grey>
            <Button.Orange
              className="w-24"
              paddingClasses={["py-2"]}
              textSizeClass={"text-sm"}
              disabled={
                inputError.password ||
                inputError.passwordConfirm ||
                verifying ||
                !password ||
                !passwordConfirm
              }
              onClick={handlePasswordChange}
            >
              {verifying ? <CircularProgress size={20} /> : "Update"}
            </Button.Orange>
          </div>
        </div>
      )}
    </>
  );
}

function OtpPopup({ to, setPopup, setResponseStatus }) {
  OtpPopup.propTypes = {
    to: PropTypes.string,
    setPopup: PropTypes.func,
    setResponseStatus: PropTypes.func,
  };

  const [attempt, setAttempt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const code = otpDigits.join("");

  const handleInputChange = (e, index) => {
    const { value, keyCode } = e.target;

    if (value.length > 1) {
      // If the user pastes multiple characters, only consider the first character
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value[0];
      setOtpDigits(newOtpDigits);
    } else {
      setOtpDigits((prevOtpDigits) => {
        const newOtpDigits = [...prevOtpDigits];
        newOtpDigits[index] = value;
        return newOtpDigits;
      });
    }

    // Move to the next input field if there's a value
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Prevent the increment when the Up key is pressed
    if (keyCode === 38 && index === otpDigits.length - 1) {
      e.preventDefault();
    }
  };

  const handleInputBackspace = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index]) {
      // Move to the previous input field if the current field is empty and Backspace is pressed
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInputPaste = (e, index) => {
    const pastedValue = e.clipboardData.getData("Text");
    const otpArray = pastedValue.split("").slice(0, otpDigits.length);
    setOtpDigits(otpArray);

    // Move to the next input field if there's a value
    if (index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  async function handleSubmit() {
    if (attempt > 2) return setResponse("Max attempts reached");
    setAttempt(attempt + 1);
    setSubmitting(true);
    try {
      setResponse("");
      const res = await axios.post("/verifycheck", {
        to,
        code,
      });
      if (res.data.status === "approved") {
        setResponse("Verification Successfull");
        setResponseStatus(res.data.status);
      } else {
        setResponse("Verification Unsuccessfull");
        setOtpDigits(["", "", "", "", "", ""]);
      }
    } catch (error) {
      setResponse("Verification Unsuccessfull");
      setOtpDigits(["", "", "", "", "", ""]);
    }
    setSubmitting(false);
  }
  return (
    <div className="text-center mt-4 text-gray font-sans ">
      <p className="mb-2">Enter the 6 digit code</p>
      <div>
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            type="number"
            value={digit}
            min={0}
            className="w-12 h-12 border rounded border-orange text-center text-xl bg-transparent mr-2"
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleInputBackspace(e, index)}
            onPaste={(e) => handleInputPaste(e, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-evenly">
        <Button.Grey
          className="w-24"
          paddingClasses="py-2"
          textClasses="text-sm text-gray tracking-wide"
          onClick={() => setPopup(false)}
        >
          Cancel
        </Button.Grey>
        <Button.Orange
          className="w-24"
          disabled={code.length < 6 || submitting}
          paddingClasses={["py-2"]}
          textSizeClass={"text-sm"}
          onClick={handleSubmit}
        >
          {!submitting ? "Submit" : <CircularProgress size={20} />}
        </Button.Orange>
      </div>
      {!submitting && <p className="text-grey mt-4 font-bold">{response}</p>}
    </div>
  );
}
