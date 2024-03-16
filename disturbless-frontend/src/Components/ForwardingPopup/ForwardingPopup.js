import React, { useContext, useState, useEffect } from "react";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";
import { Tooltip } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import * as Button from "../Button/Button";
import { Icon } from "@iconify/react";
import infoIcon from "@iconify/icons-akar-icons/info";
// import emailIcon from "@iconify-icons/carbon/email";
import labelIcon from "@iconify/icons-uil/label";
// import bxPhone from "@iconify-icons/bx/bx-phone";
import bxVoicemail from "@iconify-icons/bx/bx-voicemail";
import Input from "../Input/Input";
import { CircularProgress } from "@mui/material";
import { AppContext } from "../../App";
import Popup from "../Popup/Popup";
import axios from "axios";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import { SelectElement } from "../Input/Input";

const fullConfig = resolveConfig(tailwindConfig);

export default function ForwardingPopup() {
  const { forwardingPopupOpen, setForwardingPopupOpen } =
    useContext(NumbersContext);

  return (
    <Popup render={forwardingPopupOpen} toggleRender={setForwardingPopupOpen}>
      <ForwardingPopupContent />
    </Popup>
  );
}

function ForwardingPopupContent() {
  const { number, setForwardingPopupOpen } = useContext(NumbersContext);
  const {
    appContextData: {
      dashboardVerifiedId: { numbers: verifiedNumbers, emails: verifiedEmails },
    },
    setContextData,
  } = useContext(AppContext);
  const [forwarding, setForwarding] = useState(number.settings.forwarding);
  const [label, setLabel] = useState(number.label);
  const [email, setEmail] = useState(forwarding.emailAddress);
  const [primaryNumber, setPrimaryNumber] = useState(
    forwarding.primaryPhoneNumber
  );
  const [voiceMail, setVoiceMail] = useState(forwarding.voiceMailGreeting);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!verifiedEmails && !verifiedNumbers) {
      axios.get("/api/verifyids").then(({ data }) => {
        setContextData((prev) => ({ ...prev, dashboardVerifiedId: data }));
      });
    }
  }, []);

  async function saveForwardingSettings() {
    setSaving(true);
    setResponse("");
    try {
      await axios.post(`/api/numbers/${number.number}/settings`, {
        ...forwarding,
        emailAddress: email,
        primaryPhoneNumber: primaryNumber,
        voiceMailGreeting: voiceMail,
        label,
      });
      setResponse("Settings saved successfully");
      number.settings.forwarding = {
        ...forwarding,
        emailAddress: email,
        primaryPhoneNumber: primaryNumber,
        voiceMailGreeting: voiceMail,
      };
      number.label = label;
      setTimeout(() => {
        setForwardingPopupOpen(false);
      }, 1000);
    } catch (error) {
      setResponse("An Error occurred while saving" + error.message);
    }
    setSaving(false);
  }

  return (
    <div className="btn-grey-bg btn-shadow rounded-5xl max-h-screen overflow-auto">
      <div className="p-10">
        <h6 className="text-blue text-lg font-sans font-bold">
          Forwarding settings for: {number.number}
        </h6>
        <div className="mt-8">
          <div className="flex mb-2 items-center text-gray font-sans font-medium leading-8">
            <h6 className="">Label</h6>
            <Tooltip title="Add label to this number" arrow>
              <div className="ml-2">
                <Icon icon={infoIcon} color="#686868" />
              </div>
            </Tooltip>
          </div>
          <Input
            placeholder={"Label"}
            value={label}
            setValue={setLabel}
            type="text"
            className=""
            InputIcon={
              <Icon
                icon={labelIcon}
                color={fullConfig.theme.colors.gray.DEFAULT}
                width={24}
                height={24}
                className="absolute top-3 left-5"
              />
            }
          />
        </div>
        <div className="mt-8 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h6 className="text-gray font-sans font-medium leading-8">
              Forward to email
            </h6>
            <Tooltip
              title="Sends you an email if someone messages this number"
              arrow
            >
              <div className="ml-2">
                <Icon icon={infoIcon} color="#686868" />
              </div>
            </Tooltip>
          </div>
          <Switch
            size="small"
            color="primary"
            className=""
            checked={forwarding.toEmail}
            onChange={(e) => {
              setForwarding({
                ...forwarding,
                toEmail: e.target.checked,
              });
            }}
          />
        </div>
        {forwarding.toEmail && (
          <SelectElement
            data={verifiedEmails}
            selected={email}
            setSelected={setEmail}
          />
        )}
        <div className="mt-8 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h6 className="text-gray font-sans font-medium leading-8">
              Forward to primary phone number
            </h6>
            <Tooltip title="Redirects SMSs to your primary phone number" arrow>
              <div className="ml-2">
                <Icon icon={infoIcon} color="#686868" />
              </div>
            </Tooltip>
          </div>

          <Switch
            size="small"
            color="primary"
            className=""
            checked={forwarding.toPrimaryPhone}
            onChange={(e) => {
              setForwarding({
                ...forwarding,
                toPrimaryPhone: e.target.checked,
              });
            }}
          />
        </div>
        {forwarding.toPrimaryPhone && (
          <SelectElement
            data={verifiedNumbers}
            selected={primaryNumber}
            setSelected={setPrimaryNumber}
          />
        )}
        <div className="mt-8">
          <div className="flex items-center mb-2">
            <h6 className="text-gray font-sans font-medium leading-8">
              Change default voicemail greeting
            </h6>
            <Tooltip
              title="Voicemail greeting in case of number busy or unreachable"
              arrow
            >
              <div className="ml-2">
                <Icon icon={infoIcon} color="#686868" />
              </div>
            </Tooltip>
          </div>
          <Input
            placeholder={"Enter your voicemail greeting."}
            setValue={setVoiceMail}
            value={voiceMail}
            type="text"
            className=""
            InputIcon={
              <Icon
                icon={bxVoicemail}
                color={fullConfig.theme.colors.gray.DEFAULT}
                width={24}
                height={24}
                className="absolute top-3 left-5"
              />
            }
          />
        </div>
        <div className="mt-6 flex justify-evenly">
          <Button.Grey
            paddingClasses="py-2 w-32"
            textClasses=" text-gray tracking-wide"
            className="text-sm"
            onClick={() => setForwardingPopupOpen(false)}
          >
            Cancel
          </Button.Grey>

          <Button.Orange
            className=""
            disabled={saving}
            paddingClasses={["py-2", "w-32"]}
            textSizeClass={"text-sm"}
            onClick={saveForwardingSettings}
          >
            {saving ? <CircularProgress size={20} /> : "Save"}
          </Button.Orange>
        </div>
        {!saving && response && (
          <p className="text-center text-gray mt-4">{response}</p>
        )}
      </div>
    </div>
  );
}
