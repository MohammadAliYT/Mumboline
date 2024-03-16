import React from "react";

import Icon from "@iconify/react";
import sendAlt from "@iconify-icons/carbon/send-alt";

import "./_messageAnimation.scss";

export default function MessageAnimation() {
  return (
    <div className="border-b-2 border-orange w-28 relative">
      <Icon
        icon={sendAlt}
        color="#F29161"
        width={24}
        height={24}
        className="cardMissile"
      />
    </div>
  );
}
