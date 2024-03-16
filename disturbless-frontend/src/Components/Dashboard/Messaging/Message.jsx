import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import userAvatarFilled from "@iconify/icons-carbon/user-avatar-filled";
import { getTimePassedFromNowAsString } from "./getTimePassedFromNowAsString";
import { Tooltip } from "@material-ui/core";
import infoIcon from "@iconify/icons-akar-icons/info";
import TranscriptionPopup from "../Messaging/TranscriptionPopup";

export function Message(props) {
  const [transcriptionPopup, setTranscriptionPopupOpen] = useState(false);
  const { content, unixTime, source, recordingUrl, transcriptionText } = props;

  Message.propTypes = {
    content: PropTypes.string,
    unixTime: PropTypes.any,
    source: PropTypes.string,
    recordingUrl: PropTypes.string,
    transcriptionText: PropTypes.string,
  };

  return (
    <div>
      <div
        className={`flex items-center relative ${
          source === "received" ? "justify-start" : "justify-end"
        }`}
      >
        {source === "received" && (
          <Icon
            icon={userAvatarFilled}
            color="#686868"
            width="32"
            height="32"
          />
        )}
        {recordingUrl && transcriptionText ? (
          <div className="flex flex-col">
            <audio
              controls
              src={recordingUrl}
              className={`p-1 rounded-2xl ${
                source === "received" ? "messageIn ml-2" : "bg-blue"
              }`}
            />
            <div className="flex">
              <span
                className="font-bold text-sm ml-2 mt-0.5 cursor-pointer"
                onClick={() => setTranscriptionPopupOpen(true)}
              >
                See Transcription
              </span>
              <Tooltip
                title="Transcription generated automatically, it may contain errors"
                arrow
              >
                <div className="ml-2 mt-1">
                  <Icon icon={infoIcon} color="#686868" />
                </div>
              </Tooltip>
            </div>
          </div>
        ) : (
          <p
            className={`text-xs font-sans p-3 max-w-message rounded-2xl message ${
              source == "received"
                ? "messageIn text-gray ml-2"
                : "bg-blue text-white"
            }`}
          >
            {content}
          </p>
        )}
      </div>
      <h6
        className={`messageTime text-gray font-sans pt-2 ${
          source == "received" ? "pl-14" : "float-right pr-4"
        }`}
      >
        {`${getTimePassedFromNowAsString(unixTime)} ago`}
      </h6>
      <TranscriptionPopup
        transcriptionPopup={transcriptionPopup}
        setTranscriptionPopupOpen={setTranscriptionPopupOpen}
        transcriptionText={transcriptionText}
      />
    </div>
  );
}
