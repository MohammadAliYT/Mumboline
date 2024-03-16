import React from "react";
import PageTitle from "../PageTitle/PageTitle";

export function VerifiedHeader() {
  return (
    <div className="flex w-full sm:flex-row flex-col sm:items-stretch items-center">
      <PageTitle
        pageTitle={"Verified IDs"}
        headingClassname={"text-blue text-4xl font-sans font-medium ml-4"}
      />
    </div>
  );
}
