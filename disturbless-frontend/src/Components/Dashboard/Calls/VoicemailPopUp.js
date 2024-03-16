// Popup code for the when clicking on add number

import React, { useContext } from "react";
import { CallsContext } from "./Calls";
import Popup from "../../Popup/Popup";
import PropTypes from "prop-types";

export default function VoicemailPopUpOpen(props) {
  let { voicemailPopup, setVoicemailPopup } = useContext(CallsContext);

  VoicemailPopUpOpen.propTypes = {
    call: PropTypes.object,
  };

  return (
    <Popup
      render={voicemailPopup}
      toggleRender={setVoicemailPopup}
      //   onEnter={getCountries.bind(this, setCountriesList)}
    >
      <VoicemailPopUp call={props.call} />
    </Popup>
  );
}

function VoicemailPopUp(props) {
  VoicemailPopUp.propTypes = {
    call: PropTypes.object,
  };

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow text-center">
      <h1 className="font-bold text-lg my-5">
        Voicemail from {props.call.From}
      </h1>
      <div className="text-left mx-10">
        <p className="my-5 font-semibold">Voicemail Speech-to-Text</p>
        <p className="w-4/5">{props.call.TranscriptionText}</p>
        <audio
          controls
          src={props.call.RecordingUrl}
          className="mx-auto mb-10 mt-5"
        ></audio>
      </div>
    </div>
  );
}
