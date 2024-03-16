/* eslint-disable no-unused-vars */
import React from "react";
import "./_table.scss";

import PropTypes from "prop-types";
import * as Button from "../Button/Button";
import { CircularProgress } from "@material-ui/core";
import AddVerifyIdPopup from "../Dashboard/VerifiedId/AddVerifyIdPopup";

// Example structure for the table component:
// {
//   title: "",
//   tableHeads: [""],
//   rows: [["", "", "", ""], ["", "", "", ""]]
// }

// Apply flex, flex-col on mobile, and center, starting from about 720px
export function Table(props) {
  let { title, tableHeads, rows } = props;

  Table.propTypes = {
    title: PropTypes.string,
    tableHeads: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.any,
  };

  return (
    <div>
      <div className="btn-grey-bg btn-shadow rounded-5xl p-6 font-sans">
        {title && (
          <h6 className="text-blue text-lg font-medium mb-4">{title}</h6>
        )}
        <table className="font-sans text-gray w-full text-center">
          <tbody>
            <tr className="th">
              {tableHeads.map((th, i) => (
                <th key={i} className="text-sm font-bold">
                  {th}
                </th>
              ))}
            </tr>

            {rows.length > 0 ? (
              rows.map((row, i) => (
                <tr
                  className="hover:bg-gray-200 cursor-pointer"
                  key={i}
                  onClick={() => location.assign("/dashboard/inbox/")}
                >
                  {row.map((col, j) => (
                    <td key={j}>{col}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeads.length}>
                  There isn&apos;t any data to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-right">
          <a
            href="/dashboard/inbox/"
            className="text-right mr-4 text-blue p-2 hover:shadow"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
}

export function CallsTable(props) {
  let { title, tableHeads, rows } = props;

  CallsTable.propTypes = {
    title: PropTypes.string,
    tableHeads: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.any,
  };

  return (
    <div className="btn-grey-bg btn-shadow px-4 font-sans">
      {title && <h6 className="text-blue text-lg font-medium mb-6">{title}</h6>}
      <table className="font-sans text-gray w-full text-center">
        <tbody>
          <tr className="th">
            {tableHeads.map((th, i) => (
              <th key={i} className="text-sm font-bold ">
                {th}
              </th>
            ))}
          </tr>

          {rows?.length > 0 ? (
            rows.map((row, i) => (
              <tr key={i}>
                {row.map((col, j) => (
                  <td key={j}>{col}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeads.length}>
                There isn&apos;t any data to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function NumbersTable(props) {
  let { title, tableHeads, rows } = props;

  NumbersTable.propTypes = {
    title: PropTypes.string,
    tableHeads: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.array,
  };

  return (
    <div className="">
      <div className="btn-grey-bg btn-shadow rounded-5xl p-4 font-sans">
        {title && (
          <h6 className="text-blue text-lg font-medium mb-6">{title}</h6>
        )}
        <table className="font-sans text-gray w-full text-center">
          <tbody>
            <tr className="th">
              {tableHeads.map((th, i) => (
                <th key={i} className="text-sm font-bold">
                  {th}
                </th>
              ))}
            </tr>

            {rows && rows.length > 0 ? (
              rows.map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) => (
                    <td key={j}>{col}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeads.length}>
                  There isn&apos;t any data to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function VerifyTable({
  title,
  tableHeads,
  rows,
  setPopup,
  type,
  setType,
  setSelected,
  setRemoveButton,
}) {
  VerifyTable.propTypes = {
    title: PropTypes.string,
    tableHeads: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.array,
    setPopup: PropTypes.func,
    type: PropTypes.string,
    setType: PropTypes.func,
    setRemoveButton: PropTypes.func,
    setSelected: PropTypes.func,
  };

  return (
    <div className="">
      <div className="btn-grey-bg btn-shadow rounded-5xl p-4 font-sans">
        <div className="flex items-center justify-between mb-4">
          {title && <h6 className="text-blue text-lg font-medium">{title}</h6>}
          <Button.Orange
            className=""
            paddingClasses={["py-2", "px-4"]}
            textSizeClass={"text-sm"}
            onClick={() => {
              setType(type);
              setPopup(true);
            }}
          >
            {type == "email" ? "Add an Email" : "Add a Number"}
          </Button.Orange>
        </div>
        <table className="font-sans text-gray w-full text-center">
          <tbody>
            <tr className="th">
              {tableHeads.map((head, i) => (
                <th key={i} className="text-sm font-bold">
                  {head}
                </th>
              ))}
            </tr>
            {rows ? (
              rows.length ? (
                rows.map((row, i) => (
                  <tr key={i} className="">
                    <td className="w-72">
                      {type == "email" ? row.email : row.number}
                    </td>
                    <td>
                      <Button.Red
                        paddingClasses="px-6 py-2 mt-2 "
                        textClasses="btnTextSmall text-white tracking-wide disable"
                        onClick={() => {
                          setType(type);
                          setRemoveButton(true);
                          setSelected(
                            type === "email" ? row.email : row.number
                          );
                        }}
                      >
                        Remove
                      </Button.Red>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tableHeads.length}>
                    There isn&apos;t any data to display.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={tableHeads.length}>
                  <CircularProgress size={25} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
