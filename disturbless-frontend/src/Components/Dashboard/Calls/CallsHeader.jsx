import React, { useContext } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { NumberSelector } from "./NumberSelector";
import { CallsContext } from "./Calls";

export function CallsHeader() {
  const { showCalls, setShowCalls } = useContext(CallsContext);

  return (
    <div
      className={`flex w-full sm:flex-row flex-col sm:items-stretch items-center ${showCalls ? "" : "flex"}`}
    >
      <PageTitle
        pageTitle={"Calls"}
        headingClassname={"text-blue text-4xl font-sans font-medium ml-4"}
        returnOnClick={() => {
          setShowCalls(false);
        }}
        useAsReturn={showCalls} />
      <NumberSelector />
    </div>
  );
}
