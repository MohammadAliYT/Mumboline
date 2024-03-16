/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import * as Button from "../../Button/Button";
import Popup from "../../Popup/Popup";
import PropTypes from "prop-types";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AppContext } from "../../../App";

export default function RemoveVerifyPopup({ popup, setPopup, type, selected }) {
  RemoveVerifyPopup.propTypes = {
    popup: PropTypes.bool,
    setPopup: PropTypes.func,
    type: PropTypes.string,
    selected: PropTypes.string,
  };

  const { setContextData } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <Popup render={popup} toggleRender={setPopup}>
      <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
        <div className="pt-8 px-10 pb-12">
          <h6 className="text-blue text-lg font-sans font-bold text-center">
            Are you sure you want to remove {selected}?
          </h6>

          <div className="mt-4 text-center">
            <Button.Red
              className="mr-2"
              paddingClasses="px-6 py-2"
              textClasses="btnTextSmall text-white tracking-wide"
              onClick={() => {
                setResponse("");
                setLoading(true);
                axios
                  .post("/api/numbers/deleteVerifiedId", { [type]: selected })
                  .then((res) => {
                    setResponse(res.data.message);
                    if (type === "email") {
                      setContextData((prev) => {
                        const newData = {
                          ...prev.dashboardVerifiedId,
                          emails: prev.dashboardVerifiedId.emails.filter(
                            ({ email }) => email !== selected
                          ),
                        };
                        return {
                          ...prev,
                          dashboardVerifiedId: newData,
                        };
                      });
                    } else {
                      setContextData((prev) => {
                        const newData = {
                          ...prev.dashboardVerifiedId,
                          numbers: prev.dashboardVerifiedId.numbers.filter(
                            ({ number }) => number !== selected
                          ),
                        };
                        return {
                          ...prev,
                          dashboardVerifiedId: newData,
                        };
                      });
                    }
                    setLoading(false);
                    setTimeout(() => {
                      setPopup(false);
                    }, 1000);
                  })
                  .catch((err) => {
                    console.log("error = ", err);
                    setResponse("Failed: Something went wrong");
                    setLoading(false);
                  });
              }}
            >
              {loading ? <CircularProgress size={20} /> : "OK"}
            </Button.Red>
            <Button.Grey
              className="ml-2"
              paddingClasses="px-6 py-2 mr-5"
              textClasses="btnTextSmall text-gray tracking-wide"
              onClick={() => setPopup(false)}
            >
              Go back
            </Button.Grey>
          </div>
          <div className="mt-4 text-center text-gray">{response}</div>
        </div>
      </div>
    </Popup>
  );
}
