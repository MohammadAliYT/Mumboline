import React, { useRef, useEffect, useContext } from "react";
import { Message } from "./Message";
import { isEmpty } from "../../../Utils/isEmpty";

import { MessagingContext } from "./Messaging";
import { AppContext } from "../../../App";
import { CircularProgress } from "@mui/material";

export function Messages() {
  const { appContextData } = useContext(AppContext);
  const { selectedContact } = useContext(MessagingContext);
  const { messagesData } = appContextData;
  const messagesRef = useRef();

  useEffect(() => {
    scrollToMessagesBottomOnPageLoad(messagesRef);
  }, [appContextData]);

  return (
    <div className="mt-8 flex flex-col overflow-auto h-full" ref={messagesRef}>
      {/* Messages */}
      {isEmpty(selectedContact) ? (
        <h6 className="font-sans text-center text-gray text-xs">
          No contact has been selected
        </h6>
      ) : isEmpty(messagesData) ? (
        <CircularProgress />
      ) : messagesData.length == 1 && messagesData[0] == "No messages yet" ? (
        ""
      ) : (
        messagesData.map((message, i) => {
          return (
            <Message
              key={i}
              content={message.content}
              unixTime={message.when}
              source={message.source}
              recordingUrl={message.RecordingUrl}
              transcriptionText={message.TranscriptionText}
            />
          );
        })
      )}
    </div>
  );
}
function scrollToMessagesBottomOnPageLoad(messagesRef) {
  messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
}
