import React from "react";
import * as Button from "../../Button/Button";

export function SeeHowItWorksButton() {
  return (
    <Button.Orange 
      className="lg:mr-14 sm:mr-3 mr-0"
      onClick={seeHowItWorksOnClick}>
      See how it works
    </Button.Orange>
  );
}

function seeHowItWorksOnClick() {
  let view2 = document.getElementById("view2");
  view2.scrollIntoView({ behavior: "smooth" });
}
