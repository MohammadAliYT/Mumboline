/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from "react";
import * as Button from "../../Button/Button";
import PropTypes from "prop-types";
import Popup from "../../Popup/Popup";
import { CircularProgress } from "@mui/material";
import axios from "axios";
// import toast from "react-hot-toast";

export default function EmailVerification({ popup, setPopup, email }) {
  EmailVerification.propTypes = {
    popup: PropTypes.bool,
    setPopup: PropTypes.func,
    type: PropTypes.string,
    email: PropTypes.string,
  };

  const [saveResponse, setSaveResponse] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const code = otpDigits.join("");

  useEffect(() => {
    setError("");
    setResponse("");
    setSaveResponse("");
  }, [popup]);

  async function saveUser() {
    try {
      const res = await axios.post("/api/user/update", {
        newUsername: email,
      });
      setSaveResponse(res?.data);
      //   notify();
    } catch (error) {
      setSaveResponse("Something went wrong");
      console.log("error", error);
    }
  }

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
      const res = await axios.post("/api/numbers/verifycheck", {
        code,
        to: email,
        channel: "email",
      });
      if (res.data.status === "approved") {
        saveUser();
        setResponse("Verification Successfull");
        setTimeout(() => {
          setPopup(false);
          setOtpDigits(["", "", "", "", "", ""]);
        }, 1000);
      } else {
        setResponse("Verification Failed");
        setOtpDigits(["", "", "", "", "", ""]);
      }
    } catch (error) {
      setResponse("Something went wrong");
      setOtpDigits(["", "", "", "", "", ""]);
      console.log(error);
    }
    setSubmitting(false);
  }

  //   const notify = () =>
  //     toast(
  //       saveResponse,
  //       {
  //         duration: 3000,
  //         position: "top-center",

  //         // Styling
  //         style: {},
  //         className: "",

  //         // Custom Icon
  //         //   icon: "✅",

  //         // Change colors of success/error/loading icon
  //         iconTheme: {
  //           primary: "#000",
  //           secondary: "#fff",
  //         },

  //         // Aria
  //         ariaProps: {
  //           role: "status",
  //           "aria-live": "polite",
  //         },
  //       },
  //       console.log("toasty", "save res", saveResponse)
  //     );

  return (
    <Popup render={popup} toggleRender={setPopup}>
      <div className="btn-grey-bg btn-shadow rounded-5xl p-8">
        <h6 className="text-blue text-lg font-sans font-bold">
          Verify your email : {email}
        </h6>

        <div className="text-center mt-4 text-gray font-sans">
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
          {!submitting && (
            <p className="text-grey mt-4 font-bold">{response}</p>
          )}

          {!submitting && (
            <p className="text-grey mt-4 font-bold">{saveResponse}</p>
          )}
        </div>
      </div>
    </Popup>
  );
}
