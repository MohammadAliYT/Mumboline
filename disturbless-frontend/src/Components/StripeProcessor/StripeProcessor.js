import React, { useContext, useState } from "react";
import axios from "axios";
import * as Button from "../Button/Button";
import { CircularProgress } from "@mui/material";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";

export default function StripeProcessor() {
  const { selectedAvailableNumber, subscription, address } =
    useContext(NumbersContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit() {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/numbers/purchase/stripe/", {
        number: selectedAvailableNumber,
        subscription,
        address,
      });
      if (data.redirection_url) {
        window.open(data.redirection_url, "_blank");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Button.Orange
      type="submit"
      className="mt-56"
      disabled={isLoading}
      paddingClasses={["py-4", "w-full"]}
      textSizeClass={"text-sm"}
      onClick={handleSubmit}
    >
      {isLoading ? (
        <CircularProgress className="mx-auto" size={20} />
      ) : (
        "Checkout"
      )}
    </Button.Orange>
  );
}
