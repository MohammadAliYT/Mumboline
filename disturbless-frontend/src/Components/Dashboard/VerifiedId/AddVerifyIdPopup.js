import React, { useEffect, useState, useContext } from "react";
import * as Button from "../../Button/Button";
import PropTypes from "prop-types";
import Popup from "../../Popup/Popup";
import { InputNP } from "../../Input/Input";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import OtpPopup from "../../OtpPopup/OtpPopup";
import { isEmpty } from "../../../Utils/isEmpty";
import { AppContext } from "../../../App";

export default function AddVerifyIdPopup({ popup, setPopup, type }) {
  AddVerifyIdPopup.propTypes = {
    popup: PropTypes.bool,
    setPopup: PropTypes.func,
    type: PropTypes.string,
  };

  const {
    appContextData: {
      dashboardVerifiedId: { numbers, emails },
    },
  } = useContext(AppContext);

  const [verifying, setVerifying] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
    setError("");
    setResponse({});
  }, [popup]);

  function handleInputChange(value) {
    setInput(value);
    if (type === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidEmail = emailRegex.test(value);
      if (isValidEmail) {
        setError("");
      } else {
        setError("Invalid email");
      }
    } else {
      const numberRegex = /^\+\d{1,12}$/;
      const isValidNumber = numberRegex.test(value);
      if (isValidNumber) {
        setError("");
      } else {
        setError("Number format should be +<number>");
      }
    }
  }

  async function handleVerify() {
    if (type === "email" && emails.find(({ email }) => email === input)) {
      setError("This email is already verified");
      return;
    }
    if (type === "number" && numbers.find(({ number }) => number === input)) {
      setError("This number is already verified");
      return;
    }
    setResponse({});
    setError("");
    setVerifying(true);
    try {
      const res = await axios.post("/api/numbers/verifynew", {
        [type]: input,
      });
      setResponse(res.data);
    } catch (error) {
      setError("Something went wrong");
    }
    setVerifying(false);
  }

  return (
    <Popup render={popup} toggleRender={setPopup}>
      <div className="btn-grey-bg btn-shadow rounded-5xl p-8">
        <h6 className="text-blue text-lg font-sans font-bold">
          {type === "email" ? "Add an Email" : "Add a Number"}
        </h6>

        {isEmpty(response) ? (
          <>
            <InputNP
              className="mt-6"
              name={type === "email" ? "email" : "number"}
              placeholder={type === "email" ? "Enter Email" : "Enter Number"}
              value={input}
              setValue={handleInputChange}
            />
            {error && <p className="text-red-400 text-sm mt-1 ml-4">{error}</p>}
            <div className="flex justify-evenly items-center mt-4">
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
                paddingClasses={["py-2"]}
                textSizeClass={"text-sm"}
                disabled={!input || Boolean(error) || verifying}
                onClick={handleVerify}
              >
                {verifying ? <CircularProgress size={20} /> : "Verify"}
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
            channel={response.channel}
            to={response.to}
            setPopup={setPopup}
          />
        )}
      </div>
    </Popup>
  );
}
