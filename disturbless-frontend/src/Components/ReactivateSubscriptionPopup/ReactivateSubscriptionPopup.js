// Popup code for when clicking on cancel number, in the numbers page

import React, { useContext, useState } from "react";
import { BillingContext } from "../Dashboard/Billing/Billing";
import * as Button from "../Button/Button";
import Popup from "../Popup/Popup";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ReactivateSubscriptionPopup() {
  let { renderReactivatePopup, setRenderReactivatePopup } =
    useContext(BillingContext);
  return (
    <Popup
      render={renderReactivatePopup}
      toggleRender={setRenderReactivatePopup}
    >
      <ReactivateSubscriptionContent />
    </Popup>
  );
}

function ReactivateSubscriptionContent() {
  const { setRenderReactivatePopup, forNumber } = useContext(BillingContext);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-8 px-10 pb-12">
        <h6 className="text-blue text-lg font-sans font-bold text-center">
          Are you sure you want to reactivate this number?
        </h6>
        <h6 className="text-xs font-sans text-gray text-center">
          Auto-charge will be enabled.
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
                  .get(`/api/numbers/${forNumber.number}/reactivate`)
                  .then((res) => {
                    forNumber.autoRenew = true;
                    forNumber.isActive = true;
                    setResponse(res.data);
                    setLoading(false);
                    setTimeout(() => {
                      setRenderReactivatePopup(false);
                    }, 1000);
                  })
                  .catch((err) => {
                    console.log("error = ", err);
                    setResponse("Failed: Something went wrong");
                    setLoading(false);
                  });
              }}
            >
              Ok
            </Button.Red>
            <Button.Grey
              className="ml-2"
              paddingClasses="px-6 py-2 mr-5"
              textClasses="btnTextSmall text-gray tracking-wide"
              onClick={() => setRenderReactivatePopup(false)}
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
