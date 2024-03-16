// Popup code for the when clicking on add number
// It also contains two hooks useCountry, and useSelectedCountry
import React, { useContext, useEffect, useState } from "react";
import { NumbersContext } from "../Dashboard/Numbers/Numbers";
import * as Button from "../Button/Button";

import Popup from "../Popup/Popup";
import { Dropdown, InputNPHalf } from "../Input/Input";
import { isEmpty } from "../../Utils/isEmpty";
import { CircularProgress } from "@mui/material";
import axios from "axios";

export default function AddNumberPopup() {
  let { addNumberPopupOpen, setAddNumberPopupOpen, setCountriesList } =
    useContext(NumbersContext);

  return (
    <Popup
      render={addNumberPopupOpen}
      toggleRender={setAddNumberPopupOpen}
      onEnter={getCountries.bind(this, setCountriesList)}
    >
      <AddNumberPopupContent />
    </Popup>
  );
}

function AddNumberPopupContent() {
  let {
    countriesList,
    selectedCountry,
    availableNumbers,
    setAvailableNumbers,
    setRenderCheckoutUsingPopup,
    setSubscription,
    subscription,
    address,
    setAddress,
  } = useContext(NumbersContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(selectedCountry)) {
      setLoading(true);
      axios
        .get("/api/numbers/bycountry/" + selectedCountry.shortcode)
        .then((res) => {
          setAvailableNumbers(res.data);
          setLoading(false);
        });
    }
  }, [selectedCountry]);

  return (
    <div className="overflow-y-auto btn-grey-bg btn-shadow rounded-5xl">
      <div className="pt-9 px-10 pb-14">
        {!isEmpty(countriesList) ? (
          <>
            <h6 className="text-blue text-lg font-sans font-bold">
              Add a number
            </h6>
            <h6 className="mt-8 ml-4 text-gray font-sans text-sm leading-8">
              Country
            </h6>
            <Dropdown hook={useCountry} className="mt-2" />
            {!isEmpty(availableNumbers) &&
            !isEmpty(availableNumbers.availableNumbers) ? (
              <>
                <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                  Available Numbers
                </h6>

                {loading ? (
                  <div className="text-center">
                    <CircularProgress className="mt-2" size={20} />
                  </div>
                ) : (
                  <Dropdown hook={useSelectedCountry} className="mt-2" />
                )}
                {selectedCountry.shortcode === "GB" && (
                  <>
                    <div className="flex gap-x-5">
                      <div className="flex w-full flex-col">
                        <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                          Customer or Business name *
                        </h6>
                        <InputNPHalf
                          placeholder="Customer or Business name"
                          className="mt-2"
                          value={address.customerName}
                          setValue={setAddress}
                          name="customerName"
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                          City *
                        </h6>
                        <InputNPHalf
                          placeholder="City"
                          className="mt-2"
                          value={address.city}
                          setValue={setAddress}
                          name="city"
                        />
                      </div>
                    </div>

                    <div className="flex gap-x-5">
                      <div className="flex w-full flex-col">
                        <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                          Address *
                        </h6>
                        <InputNPHalf
                          placeholder="Address line 1"
                          className="mt-2"
                          value={address.street}
                          setValue={setAddress}
                          name="street"
                        />
                      </div>
                    </div>

                    <div className="flex gap-x-5">
                      <div className="flex w-full flex-col">
                        <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                          State *
                        </h6>
                        <InputNPHalf
                          placeholder="State"
                          className="mt-2"
                          value={address.region}
                          setValue={setAddress}
                          name="region"
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                          Zip code *
                        </h6>
                        <InputNPHalf
                          placeholder="Zip code"
                          className="mt-2"
                          value={address.postalCode}
                          setValue={setAddress}
                          name="postalCode"
                        />
                      </div>
                    </div>
                  </>
                )}
                <h6 className="mt-4 ml-4 text-gray font-sans text-sm leading-8">
                  Select a subscription
                </h6>

                <div className="flex flex-row p-4 gap-x-4 text-gray-600">
                  <div
                    className={`w-36 text-center rounded ${
                      subscription.monthly ? "bg-gray-300" : "bg-gray-200"
                    } hover:bg-gray-300 p-3 cursor-pointer`}
                    onClick={() => {
                      setSubscription({ monthly: true, yearly: false });
                    }}
                  >
                    <p>Monthly</p>
                    <p>$ 4.99</p>
                  </div>
                  <div
                    className={`w-36 text-center rounded ${
                      subscription.yearly ? "bg-gray-300" : "bg-gray-200"
                    } hover:bg-gray-300 p-3 cursor-pointer`}
                    onClick={() => {
                      setSubscription({ monthly: false, yearly: true });
                    }}
                  >
                    <p>Yearly</p>
                    <p>$ 49.99</p>
                  </div>
                </div>
              </>
            ) : (
              <CircularProgress className="mt-5 ml-3" />
            )}

            {!loading && (
              <Button.Orange
                className={
                  selectedCountry.shortcode === "GB" ? "mt-2" : "mt-56"
                }
                paddingClasses={["py-4", "w-full", "mt-6"]}
                textSizeClass={"text-sm"}
                onClick={() => setRenderCheckoutUsingPopup(true)}
              >
                Next
              </Button.Orange>
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}

function useCountry() {
  let { countriesList, setSelectedCountry, setAddress } =
    useContext(NumbersContext);
  const [country, setCountry] = useState(countriesList.countries[0]);

  useEffect(() => {
    setSelectedCountry(country);

    if (country.shortcode === "GB") {
      setAddress({
        customerName: "",
        street: "",
        city: "",
        region: "",
        postalCode: "",
      });
    }
  }, [country]);

  return {
    selected: country,
    setSelected: setCountry,
    dataObj: countriesList,
    elementDisplayFieldKey: "country",
    dataArrKey: "countries",
  };
}

function useSelectedCountry() {
  let { availableNumbers, setSelectedAvailableNumber } =
    useContext(NumbersContext);
  const [dropdownNumber, setDropdownNumber] = useState(
    availableNumbers.availableNumbers[0]
  );

  useEffect(() => {
    setSelectedAvailableNumber(dropdownNumber);
  }, [dropdownNumber]);

  useEffect(() => {
    setDropdownNumber(availableNumbers.availableNumbers[0]);
  }, [availableNumbers]);

  return {
    selected: dropdownNumber,
    setSelected: setDropdownNumber,
    dataObj: availableNumbers,
    elementDisplayFieldKey: "friendlyName",
    dataArrKey: "availableNumbers",
  };
}

function getCountries(setCountriesList) {
  axios.get("/api/numbers/getavailablecountries/").then((res) => {
    setCountriesList(res.data);
  });
}
