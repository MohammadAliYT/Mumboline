import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BillingContext } from "../Dashboard/Billing/Billing";
import { Tooltip } from "@material-ui/core";
import phoneIcon from "@iconify-icons/carbon/phone";
import phoneOutgoing from "@iconify-icons/carbon/phone-outgoing";
import { Icon } from "@iconify/react";
import smsForward from "../../Assets/sms_forward.svg";
import sentSMS from "../../Assets/sentSms.svg";
import infoIcon from "@iconify/icons-akar-icons/info";
// import callForwarding from "../../Assets/callForwarding.svg";
import moment from "moment";

export default function Subscription(props) {
  let { setRenderCancelPopup, setRenderReactivatePopup, setForNumber } =
    useContext(BillingContext);
  let { number } = props;

  const quota = number?.subscription[0]?.quota;
  Subscription.propTypes = {
    number: PropTypes.obj,
    flagImg: PropTypes.string,
  };

  return (
    <div className={"font-sans btn-shadow rounded-5xl p-4"}>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center justify-between mx-2 text-gray">
          <div>
            Subscription Type:
            <span className="font-bold">{number?.subscription[0]?.type}</span>
          </div>
          {!number?.autoRenew && (
            <div>
              Number will expire on:
              <span className="ml-2 font-bold">
                {moment(number?.subscription[0]?.expiry).format("MM-DD-YYYY")}
              </span>
            </div>
          )}
        </div>
        {/* row */}
        <div className="flex flex-col sm:flex-row gap-2 overflow-auto">
          <div className="flex flex-col justify-center items-center rounded bg-gray-200 sm:w-2/6 py-4">
            <div className="h-12 w-12 flex justify-center items-center bg-gray-300 rounded">
              <Icon icon={phoneIcon} color="gray" width={30} height={30} />
            </div>
            <span className="text-gray mt-2">Subscription For</span>
            <p className="font-bold text-lg">{number?.friendlyName}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-evenly text-center gap-2 w-full rounded py-6 bg-gray-200">
            {/* sub items */}
            <div className="flex flex-row sm:flex-col items-center justify-evenly">
              <div className="flex flex-col items-center w-20">
                <div className="flex relative h-12 w-12 justify-center items-center bg-gray-300 rounded">
                  <Tooltip
                    title="Everytime you reply to a text message 1 credit is deducted. You receive 10 credits every month as long as you keep your number."
                    arrow
                    placement="top"
                    className=" absolute -top-1 -right-1"
                  >
                    <div>
                      <Icon icon={infoIcon} color="#686868" />
                    </div>
                  </Tooltip>
                  <img src={sentSMS} alt="SMS forward" className="h-6 w-6" />
                </div>
                <p className=" text-gray mt-2">Sent SMS</p>
              </div>
              <p className="font-bold text-lg">
                {quota?.sentSMS}/{quota?.total_sentSMS}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col items-center justify-evenly">
              <div className="flex flex-col items-center">
                <div className="flex relative h-12 w-12 justify-center items-center bg-gray-300 rounded">
                  <Tooltip
                    title="Everytime an SMS is forwarded from the app to your real phone number 1 credit is deducted. You receive 10 credits every month as long as you keep your number"
                    arrow
                    placement="top"
                    className=" absolute -top-1 -right-1"
                  >
                    <div>
                      <Icon icon={infoIcon} color="#686868" />
                    </div>
                  </Tooltip>
                  <img src={smsForward} alt="SMS forward" className="h-6 w-6" />
                </div>
                <p className=" text-gray mt-2">SMS Forwarding</p>
              </div>
              <p className="font-bold text-lg">
                {quota?.smsForwarding}/{quota?.total_smsForwarding}
              </p>
            </div>
            {/* <div className="flex flex-row sm:flex-col items-center justify-evenly">
              <div className="flex flex-col items-center">
                <div className="flex relative h-12 w-12 justify-center items-center bg-gray-300 rounded">
                  <Tooltip
                    title="Everytime a voicemail is recorded by the caller 1 credit is deducted. You receive 10 credits every month as long as you keep your number."
                    arrow
                    placement="top"
                    className=" absolute -top-1 -right-1"
                  >
                    <div>
                      <Icon icon={infoIcon} color="#686868" />
                    </div>
                  </Tooltip>
                  <img
                    src={callForwarding}
                    alt="SMS forward"
                    className="h-6 w-6"
                  />
                </div>
                <p className=" text-gray mt-2">VoiceMail Forwarding</p>
              </div>
              <p className="font-bold text-lg">
                {quota?.voiceMailForwarding}/{quota?.total_voiceMailForwarding}
              </p>
            </div> */}
            <div className="flex flex-row sm:flex-col items-center justify-evenly">
              <div className="flex flex-col items-center">
                <div className="flex relative h-12 w-12 justify-center items-center bg-gray-300 rounded">
                  <Tooltip
                    title="Everytime a call minute is forwarded from your virtual number to your real number 1 minute is deducted. You receive 10 minutes every month as long as you keep your number."
                    arrow
                    placement="top"
                    className=" absolute -top-1 -right-1"
                  >
                    <div>
                      <Icon icon={infoIcon} color="#686868" />
                    </div>
                  </Tooltip>
                  <Icon
                    icon={phoneOutgoing}
                    color="gray"
                    width={30}
                    height={30}
                  />
                </div>
                <p className=" text-gray mt-2">Call Forwarding</p>
              </div>
              <p className="font-bold text-lg">
                {quota?.callForwarding}/{quota?.total_callForwarding}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          {number?.autoRenew ? (
            <>
              <span className="text-gray">* Auto-charge is enabled.</span>
              <span
                className=" cursor-pointer ml-5 text-blue"
                onClick={() => {
                  setForNumber(number);
                  setRenderCancelPopup(true);
                }}
              >
                Disable
              </span>
            </>
          ) : (
            <>
              <span className="text-gray">* Auto-charge is disabled</span>
              <span
                className=" cursor-pointer ml-5 text-blue"
                onClick={() => {
                  setForNumber(number);
                  setRenderReactivatePopup(true);
                }}
              >
                Reactivate
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
