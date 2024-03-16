// Code for the login popup

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
import Checkbox from "../Checkbox/Checkbox";
import Popup from "../Popup/Popup";
import { useHistory } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

import { MainContext } from "../Main/Main";
import { CircularProgress } from "@mui/material";

export default function LoginPopup() {
  let { renderLogin, setRenderLogin } = useContext(MainContext);
  return (
    <Popup render={renderLogin} toggleRender={setRenderLogin}>
      <LoginSignupPopup />
    </Popup>
  );
}

function LoginSignupPopup() {
  const { setForgotPasswordPopup } = useContext(MainContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  let { setRenderSignup } = useContext(MainContext);
  let onSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("loginEmail", email);
    console.log(rememberMe);

    await loginAndRedirect(email, password, history, setLoading);
  };

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <h3 className="text-blue text-2xl font-sans font-bold text-center pt-10">
        Sign in to MumboLine
      </h3>
      <h5 className="text-gray font-sans text-center pt-5">
        Login here using your email and password
      </h5>
      <form className="px-10" onSubmit={onSubmit}>
        <h6 className="text-gray text-sm font-sans pt-10 pb-5">Your email</h6>
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
        <h6 className="text-gray text-sm font-sans pt-6 pb-5">Your password</h6>
        <InputPassword
          placeholder={"Password"}
          setValue={setPassword}
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
        <div className={"flex mt-10"}>
          <Checkbox
            className="ml-3"
            checkboxName={"rememberme"}
            labelText={"Remember me?"}
            setValue={setRememberMe}
          />
          <h6
            className={
              "ml-auto text-gray text-sm font-medium font-sans cursor-pointer"
            }
            onClick={() => setForgotPasswordPopup(true)}
          >
            Forgot password?
          </h6>
        </div>
        <Button.Orange
          disabled={!email || !password || loading}
          paddingClasses={["py-3", "w-full", "mt-6"]}
          textSizeClass={"text-sm"}
        >
          {loading ? <CircularProgress size={20} /> : "Login"}
        </Button.Orange>
        {/* <h6
          className={
            "text-gray text-center text-sm font-regular font-sans mt-8"
          }
        >
          Or sign in with
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
        <div
          className={
            "text-gray text-center text-sm font-bold font-sans mt-7 mb-10 cursor-pointer"
          }
          onClick={() => {
            setRenderSignup(true);
          }}
        >
          <span>Sign up ?</span>
        </div>
      </form>
    </div>
  );
}

export async function loginAndRedirect(email, password, history, setVerifying) {
  try {
    setVerifying(true);
    let response = await axios({
      method: "POST",
      url: "/login",
      data: {
        username: email,
        password: password,
      },
      withCredentials: true,
    });
    setVerifying(false);
    if (response.status == 200) {
      history.push("/dashboard");
    }
  } catch (e) {
    setVerifying(false);
    alert("Please verify your e-mail or password.");
  }
}
