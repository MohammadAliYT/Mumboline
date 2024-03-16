import React, { useContext } from "react";
import { AppContext } from "../../../App";
import PropTypes from "prop-types";

import moment from "moment";
import { Table } from "../../Table/Table";

import AnimatedDashboardSlider from "../../AnimatedDashboardSlider/AnimatedDashboardSlider";

import { getDashboardHomeTips } from "../../../DataGrabber";
import PageTitle from "../PageTitle/PageTitle";
import { CircularProgress } from "@mui/material";

export default function Home() {
  let { appContextData } = useContext(AppContext);
  let { dashboardHomeData } = appContextData;
  let { userRecentMessages } = dashboardHomeData;

  return (
    <div className="py-24 px-16">
      <PageTitle
        pageTitle={"Dashboard"}
        containerClassname={"mb-10"}
        headingClassname={"lg:ml-4 text-blue text-3xl font-sans font-medium"}
      />
      <AnimatedDashboardSlider hints={getDashboardHomeTips()} />
      <h4 className="text-blue text-2xl font-sans font-medium mt-16 mb-10">
        Recent History
      </h4>
      {userRecentMessages ? (
        <>
          <MessagesTable tableTitle="Received Messages" direction="received" />
          <MessagesTable
            tableTitle="Sent Messages"
            direction="out"
            className="mt-12"
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

function MessagesTable(props) {
  let { className, direction, tableTitle } = props;

  MessagesTable.propTypes = {
    className: PropTypes.string,
    direction: PropTypes.string,
    tableTitle: PropTypes.string,
  };

  let { appContextData } = useContext(AppContext);
  let { dashboardHomeData } = appContextData;
  let { userRecentMessages } = dashboardHomeData;
  let { userReceivedMessages, userSentMessages } = userRecentMessages;
  let data = direction === "received" ? userReceivedMessages : userSentMessages;

  return (
    <div className={className ? className : ""}>
      <Table
        title={tableTitle}
        tableHeads={["Date", "From", "To", "Message"]}
        rows={data.map((message) => {
          return [
            moment(message.message.when).format("MM-DD-YYYY"),
            direction === "received" ? message.contact : message.ourNumber,
            direction === "received" ? message.ourNumber : message.contact,
            message.message,
          ];
        })}
      />
    </div>
  );
}
