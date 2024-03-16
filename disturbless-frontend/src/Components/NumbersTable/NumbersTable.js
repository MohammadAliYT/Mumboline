// The numbers table in the numbers page

import React, { useState } from "react";
import PropType from "prop-types";
import MultiPagesTable from "../MultiPagesTable/MultiPagesTable";
import * as Button from "../Button/Button";

import { InputDimmed } from "../Input/Input";
import axios from "axios";

export default function NumbersTable(props) {
  let { initialNumbers, className = "", numbersNature } = props;

  let [numbers, setNumbers] = useState(initialNumbers);
  let [newNumber, setNewNumber] = useState("");

  NumbersTable.propTypes = {
    initialNumbers: PropType.arrayOf(PropType.string),
    className: PropType.string,
    numbersNature: PropType.string // "whitelist" or "blacklist"
  };

  return (
    <div className={className}>
      <MultiPagesTable
        tableHeads={["Number", "Action"]}
        rows={[
          [
            <InputDimmed
              key="Input Dimmed Key"
              placeholder="(555) 555-1234"
              value={newNumber}
              setValue={setNewNumber}
            />,
            <Button.Green
              key={"Add Number Button"}
              className="mr-2"
              paddingClasses="px-6 py-2"
              textClasses="btnTextSmall text-white tracking-wide"
              onClick={() => {
                setNumbers([newNumber, ...numbers]);
                setNewNumber("");
                axios.get(`/api/notifications/${numbersNature}/add/${newNumber}`);
              }}
            >
              Add
            </Button.Green>,
          ],
        ].concat(
          numbers.map((number, i) => [
            number,
            <Button.Red
              key={i}
              className="mr-2"
              paddingClasses="px-6 py-2"
              textClasses="btnTextSmall text-white tracking-wide"
              onClick={() => {
                setNumbers(
                  numbers.filter((numberFromArr) => numberFromArr != number)
                );
                console.log("I'm getting called");
                axios.get(`/api/notifications/${numbersNature}/remove/${number}`);
              }}
            >
              Remove
            </Button.Red>,
          ])
        )}
      />
    </div>
  );
}
