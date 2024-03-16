// The cancel number popup, content that gets drawn when clicking on cancel number.
import React, { useContext, useState } from "react";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";
import Popup from "../Popup/Popup";
import moment from "moment";
import * as Button from "../Button/Button";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function CancelNumberSubscriptionPopup() {
  const { cancelPopupOpen, setCancelPopupOpen } = useContext(NumbersContext);

  return (
    <Popup render={cancelPopupOpen} toggleRender={setCancelPopupOpen}>
      <CancelNumberSubscriptionPopupContent />
    </Popup>
  );
}

function CancelNumberSubscriptionPopupContent() {
  const { setCancelPopupOpen, number } = useContext(NumbersContext);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-8 px-10 pb-12">
        <h6 className="text-blue text-lg font-sans font-bold text-center">
          Are you sure you want to remove this number?
        </h6>
        <h6 className="text-xs font-sans text-gray text-center">
          You will have its benefits until:{" "}
          {moment(number.expires).format("DD-MM-YYYY")}
        </h6>
        {loading ? (
          <div className="mt-4 text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="mt-4 text-center">
            <Button.Red
              className="mr-2"
              paddingClasses="px-6 py-2"
              textClasses="btnTextSmall text-white tracking-wide"
              onClick={() => {
                setResponse("");
                setLoading(true);
                axios
                  .get("/api/numbers/" + number.number + "/cancel/")
                  .then((res) => {
                    number.isActive = false;
                    setResponse(res.data);
                    setLoading(false);
                    setTimeout(() => {
                      setCancelPopupOpen(false);
                    }, 1000);
                  })
                  .catch((err) => {
                    setLoading(false);
                    setResponse(err.message);
                  });
              }}
            >
              Ok
            </Button.Red>
            <Button.Grey
              className="ml-2"
              paddingClasses="px-6 py-2 mr-5"
              textClasses="btnTextSmall text-gray tracking-wide"
              onClick={() => setCancelPopupOpen(false)}
            >
              Go back
            </Button.Grey>
          </div>
        )}
        <div className="mt-4 text-center text-gray">{response}</div>
      </div>
    </div>
  );
}
