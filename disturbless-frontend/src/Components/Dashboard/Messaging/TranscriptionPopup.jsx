import React from "react";
import PropTypes from "prop-types";
import Popup from "../../Popup/Popup";
import * as Button from "../../Button/Button";

export default function TranscriptionPopup(props) {
  const { transcriptionPopup, setTranscriptionPopupOpen, transcriptionText } =
    props;
  TranscriptionPopup.propTypes = {
    transcriptionPopup: PropTypes.bool,
    setTranscriptionPopupOpen: PropTypes.func,
    transcriptionText: PropTypes.string,
  };

  return (
    <Popup render={transcriptionPopup} toggleRender={setTranscriptionPopupOpen}>
      <TranscriptionPopupContent
        transcriptionText={transcriptionText}
        setTranscriptionPopupOpen={setTranscriptionPopupOpen}
      />
    </Popup>
  );
}

function TranscriptionPopupContent({
  transcriptionText,
  setTranscriptionPopupOpen,
}) {
  TranscriptionPopupContent.propTypes = {
    transcriptionText: PropTypes.string,
    setTranscriptionPopupOpen: PropTypes.func,
  };
  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <h3 className="text-blue text-2xl font-sans font-bold p-10">
        Transcribed Message
      </h3>
      <p className="px-10 pb-10">{transcriptionText}</p>
      <div className="flex">
        <Button.Orange
          paddingClasses={["py-4", "w-32", "m-6", "mx-10", "ml-auto"]}
          textSizeClass={"text-sm"}
          onClick={() => setTranscriptionPopupOpen(false)}
        >
          Close
        </Button.Orange>
      </div>
    </div>
  );
}
