import React, { useContext, useState, createContext } from "react";
import PageTitle from "../PageTitle/PageTitle";

import { Tooltip } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import { Icon } from "@iconify/react";
import infoIcon from "@iconify/icons-akar-icons/info";

import * as Button from "../../Button/Button";
import { CircularProgress } from "@mui/material";
import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import { useEffect } from "react";
import axios from "axios";
import ManageWhiteListPopup from "../../ManageWhitelistPopup/ManageWhitelistPopup";
import ManageBlockListPopup from "../../ManageBlocklistPopup/ManageBlocklistPopup";

export let NotificationsContext = createContext({
  manageWhiteListPopupOpen: false,
  setManageWhiteListPopupOpen: () => {},
  manageBlocklistPopupOpen: false,
  setManageBlocklistPopupOpen: () => {},
});

export default function Notifications() {
  let { appContextData } = useContext(AppContext);
  let { dashboardNotificationsData } = appContextData;

  let [manageWhiteListPopupOpen, setManageWhiteListPopupOpen] = useState(false);
  let [manageBlocklistPopupOpen, setManageBlocklistPopupOpen] = useState(false);

  return (
    <div className="sm:pt-24 pt-7 sm:px-16 px-4 flex-grow">
      <NotificationsContext.Provider
        value={{
          manageWhiteListPopupOpen,
          setManageWhiteListPopupOpen,
          manageBlocklistPopupOpen,
          setManageBlocklistPopupOpen,
        }}
      >
        <PageTitle
          pageTitle={"Notifications"}
          headingClassname={"text-blue text-4xl font-sans font-medium lg:ml-0"}
          useAsReturn={false}
        />
        {isEmpty(dashboardNotificationsData) ? (
          <CircularProgress className="mt-5" />
        ) : (
          <NotificationSettings />
        )}
        <ManageWhiteListPopup />
        <ManageBlockListPopup />
      </NotificationsContext.Provider>
    </div>
  );
}

function NotificationSettings() {
  let { appContextData } = useContext(AppContext);
  let { setManageWhiteListPopupOpen, setManageBlocklistPopupOpen } =
    useContext(NotificationsContext);
  let { dashboardNotificationsData } = appContextData;

  let [isLoading, setIsLoading] = useState(true);

  let [pushNotificationsState, setPushNotificationsState] = useState({
    sendPushVoiceOnly:
      dashboardNotificationsData.userSettings.settings.pushNotifications.voice,
    sendPushSmsOnly:
      dashboardNotificationsData.userSettings.settings.pushNotifications.text,
    sendPushNotifications:
      dashboardNotificationsData.userSettings.settings.pushNotifications.text &&
      dashboardNotificationsData.userSettings.settings.pushNotifications.voice,
  });

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      axios.post("/api/notifications/update", {
        sendPushSms: pushNotificationsState.sendPushSmsOnly,
        sendPushVoice: pushNotificationsState.sendPushVoiceOnly,
      });
    }
  }, [pushNotificationsState]);

  return (
    <>
      <h2 className="font-medium font-sans text-blue text-lg mt-12">
        General Notifications
      </h2>
      {/* <div className="mt-8 flex items-center">
        <h6 className="text-gray font-sans leading-8">
          Send push notifications
        </h6>
        <Tooltip
          title="Controls whether you'd like to receive push notifications on your phone"
          arrow
        >
          <div className="ml-4">
            <Icon icon={infoIcon} color="#686868" />
          </div>
        </Tooltip>
        <Switch
          size="small"
          color="primary"
          className="ml-auto"
          checked={pushNotificationsState.sendPushNotifications}
          onChange={(event) => {
            if (event.target.checked) {
              setPushNotificationsState({
                sendPushNotifications: true,
                sendPushVoiceOnly: true,
                sendPushSmsOnly: true,
              });
            }
            if (!event.target.checked) {
              setPushNotificationsState({
                sendPushNotifications: false,
                sendPushVoiceOnly: false,
                sendPushSmsOnly: false,
              });
            }
          }}
        />
      </div> */}
      <div className="mt-8 flex items-center">
        <h6 className="text-gray font-sans leading-8">
          Receive push notifications for voicemails
        </h6>
        <Tooltip
          title="Controls whether you'd like to receive push notifications on your phone"
          arrow
        >
          <div className="ml-4">
            <Icon icon={infoIcon} color="#686868" />
          </div>
        </Tooltip>
        <Switch
          size="small"
          color="primary"
          className="ml-auto"
          checked={pushNotificationsState.sendPushVoiceOnly}
          onChange={(event) => {
            if (event.target.checked) {
              setPushNotificationsState({
                ...pushNotificationsState,
                sendPushNotifications: true,
                sendPushVoiceOnly: true,
              });
            }
            if (!event.target.checked) {
              setPushNotificationsState({
                ...pushNotificationsState,
                sendPushVoiceOnly: false,
                sendPushNotifications: pushNotificationsState.sendPushSmsOnly,
              });
            }
          }}
        />
      </div>
      <div className="mt-8 flex items-center">
        <h6 className="text-gray font-sans leading-8">
          Receive push notifications for messages
        </h6>
        <Tooltip
          title="Controls whether you'd like to receive push notifications on your phone"
          arrow
        >
          <div className="ml-4">
            <Icon icon={infoIcon} color="#686868" />
          </div>
        </Tooltip>
        <Switch
          size="small"
          color="primary"
          className="ml-auto"
          checked={pushNotificationsState.sendPushSmsOnly}
          onChange={(event) => {
            if (event.target.checked) {
              setPushNotificationsState({
                ...pushNotificationsState,
                sendPushNotifications: true,
                sendPushSmsOnly: true,
              });
            }
            if (!event.target.checked) {
              setPushNotificationsState({
                ...pushNotificationsState,
                sendPushSmsOnly: false,
                sendPushNotifications: pushNotificationsState.sendPushVoiceOnly,
              });
            }
          }}
        />
      </div>
      <h2 className="font-medium font-sans text-blue text-lg mt-12">
        Customize your notifications
      </h2>
      <div className="mt-8 flex items-center">
        <h6 className="text-gray font-sans leading-8">
          Only received notifications from whitelisted numbers
        </h6>
        <Button.Grey
          textClasses="font-sans font-bold text-gray text-xs"
          paddingClasses="px-5 py-2"
          className="ml-auto"
          onClick={() => {
            setManageWhiteListPopupOpen(true);
          }}
        >
          Manage whitelist
        </Button.Grey>
      </div>
      <div className="mt-8 flex items-center">
        <h6 className="text-gray font-sans leading-8">Blocked contacts</h6>
        <Button.Grey
          textClasses="font-sans font-bold text-gray text-xs"
          paddingClasses="px-5 py-2"
          className="ml-auto"
          onClick={() => {
            setManageBlocklistPopupOpen(true);
          }}
        >
          Manage blocklist
        </Button.Grey>
      </div>
    </>
  );
}
