import React, { useState, useContext } from "react";

import axios from "axios";
import { Icon } from "@iconify/react";

// import { GoogleFill } from "akar-icons";
// import { FacebookOption } from "grommet-icons";
import emailIcon from "@iconify-icons/carbon/email";
import lockIcon from "@iconify-icons/codicon/lock";

import * as Button from "../Button/Button";
import { InputPassword } from "../Input/Input";
import Input from "../Input/Input";
import Popup from "../Popup/Popup";
import { useHistory } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
const fullConfig = resolveConfig(tailwindConfig);

import { MainContext } from "../Main/Main";
import { loginAndRedirect } from "../LoginPopup/LoginPopup";
import { CircularProgress } from "@mui/material";

export default function SignupPopup() {
  let { renderSignup, setRenderSignup } = useContext(MainContext);
  return (
    <Popup render={renderSignup} toggleRender={setRenderSignup}>
      <SignupPopupContent />
    </Popup>
  );
}

function SignupPopupContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  let onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios({
        method: "POST",
        url: "/signup",
        data: {
          /* TODO */ username: email,
          password: password,
        },
        withCredentials: true,
      });

      if (response.status == 200) {
        loginAndRedirect(email, password, history, setLoading);
      }
    } catch (e) {
      alert("Please try with a different email, account already exists!");
    }
    setLoading(false);
  };

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl py-10">
      <h3 className="text-blue text-2xl font-sans font-bold text-center">
        Sign up to MumboLine
      </h3>
      <h5 className="text-gray font-sans text-center pt-5">
        Sign up to continue
      </h5>
      <form className="px-10" onSubmit={onSubmit}>
        <h6 className="text-gray text-sm font-sans pt-10 pb-4">Your email</h6>
        <Input
          placeholder={"example@company.com"}
          setValue={(value) => {
            setEmail(value);
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            const isValidEmail = emailRegex.test(value);
            if (isValidEmail) {
              setError({ ...error, email: "" });
            } else {
              setError({ ...error, email: "Invalid email" });
            }
          }}
          type="email"
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
        {error.email && (
          <span className="text-red-400 text-sm ml-6">{error.email}</span>
        )}
        <h6 className="text-gray text-sm font-sans pt-6 pb-4">Your password</h6>
        <InputPassword
          placeholder={"Password"}
          setValue={(value) => {
            setPassword(value);
            if (value.length > 5) {
              setError({ ...error, password: "" });
            } else {
              setError({
                ...error,
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
        {error.password && (
          <span className="text-red-400 text-sm ml-6">{error.password}</span>
        )}
        <h6 className="text-gray text-sm font-sans pt-6 pb-4">
          Confirm your password
        </h6>
        <InputPassword
          placeholder={"Password"}
          setValue={(value) => {
            setPasswordConfirm(value);
            if (value === password) {
              setError({ ...error, passwordConfirm: "" });
            } else {
              setError({
                ...error,
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
        {error.passwordConfirm && (
          <span className="text-red-400 text-sm ml-6">
            {error.passwordConfirm}
          </span>
        )}
        <Button.Orange
          disabled={
            error.password ||
            error.passwordConfirm ||
            !email ||
            !password ||
            !passwordConfirm || passwordConfirm !== password ||
           
            loading
          }
          paddingClasses={["py-3", "w-full", "mt-8"]}
          textSizeClass={"text-sm"}
        >
          {loading ? <CircularProgress size={20} /> : "Sign Up"}
        </Button.Orange>
        {/* <h6
          className={
            "text-gray text-center text-sm font-regular font-sans mt-8"
          }
        >
          Or sign up with
        </h6>
        <div className="flex justify-center mt-4">
          <a href="/auth/google" target="_blank">
            <div className='mr-2.5 btn-grey-bg btn-shadow rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 cursor-pointer'>
              <GoogleFill color={"#4285F4"} />
            </div>
          </a>
          <a href="/auth/facebook" target="_blank">
            <div className='ml-2.5 btn-grey-bg btn-shadow rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 cursor-pointer'>
              <FacebookOption color="#4267B2" />
            </div>
          </a>
        </div> */}
      </form>
    </div>
  );
}
