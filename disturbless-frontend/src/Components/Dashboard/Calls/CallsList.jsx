/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import moment from "moment";

import { CallsContext } from "./Calls";
import AnimatedRouteMount from "../../AnimatedRouteMount/AnimatedRouteMount";
import { AppContext } from "../../../App";
import { isEmpty } from "../../../Utils/isEmpty";
import { CircularProgress } from "@mui/material";
import { CallsTable } from "../../Table/Table";
import VoicemailPopUpOpen from "./VoicemailPopUp";
import * as Button from "../../Button/Button";

export function CallsList() {
  const { selectedContact, selectedNumber, setVoicemailPopup } =
    useContext(CallsContext);

  const { appContextData, setContextData } = useContext(AppContext);
  const { callsData } = appContextData;

  return (
    <div className="pl-4 flex flex-1 flex-col">
      <AnimatedRouteMount
        transitionKey={!selectedContact ? "callsKey" : selectedContact}
        className="flex-auto overflow-auto"
        routeMountRequestInfo={{
          requestPath: !selectedContact
            ? ""
            : "/api/calls/" + `${selectedNumber.number}/` + selectedContact,
          dataObjName: "callsData",
        }}
      >
        <div className="flex flex-col maxMessages overflow-auto">
          {isEmpty(selectedContact) ? (
            <h6 className="font-sans text-center text-gray text-xs">
              No contact has been selected
            </h6>
          ) : !callsData.length ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : (
            <CallsTable
              title={"Call Logs"}
              tableHeads={[
                "Status",
                "Direction",
                "When",
                "Call Duration",
                "Voicemail Message",
              ]}
              rows={callsData?.reverse().map((call, i) => {
                return [
                  call?.CallStatus,
                  call?.Direction,
                  moment(call?.when).format("MM-DD-YYYY"),
                  call?.CallDuration ? call?.CallDuration + " sec" : "--",
                  call?.TranscriptionText ? (
                    <>
                      <div key={i}>
                        <Button.Grey
                          paddingClasses="px-6 py-2"
                          textClasses="btnTextSmall text-gray tracking-wide"
                          onClick={() => {
                            setVoicemailPopup(true);
                          }}
                        >
                          Voicemail
                        </Button.Grey>
                      </div>
                      <VoicemailPopUpOpen call={call} />
                    </>
                  ) : (
                    <p>--</p>
                  ),
                ];
              })}
            />
          )}
        </div>
      </AnimatedRouteMount>
    </div>
  );
}
