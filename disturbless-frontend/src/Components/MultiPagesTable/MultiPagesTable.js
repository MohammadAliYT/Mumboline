// A table with support for pagination, see example usage in Components page.

import React, { useState, useEffect } from "react";
import "./_table.scss";

import {
  ArrowLeft,
  ArrowRight,
  NumberCell,
} from "../Testimonials/Testimonials";
import PropTypes from "prop-types";

// Example structure for the table component:
// {
//   title: "",
//   tableHeads: [""],
//   rows: [["", "", "", ""], ["", "", "", ""]],
//   nbRows: Number,
//   
// }

// Apply flex, flex-col on mobile, and center, starting from about 720px
export default function MultiPagesTable(props) {
  let { title = "", tableHeads, rows, nbRows = 5 } = props;

  let nbViews = Math.ceil(rows.length / nbRows);
  let [baseIndex, setBaseIndex] = useState(0);

  let [filteredRows, setFilteredRows] = useState(
    filterRows(rows, baseIndex, nbRows)
  );

  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    } else {
      setFilteredRows(filterRows(rows, baseIndex * nbRows, nbRows));
    }
  }, [baseIndex, rows]);

  MultiPagesTable.propTypes = {
    title: PropTypes.string,
    tableHeads: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.any,
    nbRows: PropTypes.number,
  };

  return (
    <div>
      <div className="btn-grey-bg btn-shadow rounded-5xl px-5 pt-7 font-sans flex-grow">
        {title && (
          <h6 className="text-blue text-lg font-medium pl-5 pb-7">{title}</h6>
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
              filteredRows.map((row, i) => (
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
      <div className="flex justify-center my-10">
        <RowsSelector
          nbViews={nbViews}
          currentViewIndex={baseIndex}
          setCurrentViewIndex={setBaseIndex}
        />
      </div>
    </div>
  );
}

function RowsSelector(props) {
  let {
    nbViews,
    nbNumberSelectors = 5,
    currentViewIndex,
    setCurrentViewIndex,
  } = props;

  RowsSelector.propTypes = {
    nbViews: PropTypes.number,
    nbNumberSelectors: PropTypes.number,
    currentViewIndex: PropTypes.number,
    setCurrentViewIndex: PropTypes.func,
  };

  return (
    <div className="flex">
      <ArrowLeft
        SmallCircle={true}
        onClick={goToPreviousPage(currentViewIndex, setCurrentViewIndex)}
      />
      {[
        ...Array(
          getNumberOfPages(nbViews, nbNumberSelectors, currentViewIndex)
        ),
      ].map((_, i) => (
        <NumberCell
          SmallCircles={true}
          key={i}
          number={
            calculateBaseIndex(currentViewIndex, nbNumberSelectors) + i + 1
          }
          onClick={() => {
            setCurrentViewIndex(
              calculateBaseIndex(currentViewIndex, nbNumberSelectors) + i
            );
          }}
        />
      ))}
      <ArrowRight
        SmallCircle={true}
        onClick={goToNextPage(currentViewIndex, nbViews, setCurrentViewIndex)}
      />
    </div>
  );
}

function goToNextPage(currentViewIndex, nbViews, setCurrentViewIndex) {
  return () => {
    if (currentViewIndex < nbViews - 1) {
      setCurrentViewIndex(currentViewIndex + 1);
    }
  };
}

function goToPreviousPage(currentViewIndex, setCurrentViewIndex) {
  return () => {
    if (currentViewIndex > 0) {
      setCurrentViewIndex(currentViewIndex - 1);
    }
  };
}

function getNumberOfPages(nbViews, nbNumberSelectors, currentViewIndex) {
  return nbViews > nbNumberSelectors
    ? nbViews - calculateBaseIndex(currentViewIndex, nbNumberSelectors) > nbNumberSelectors
      ? nbNumberSelectors
      : nbViews - calculateBaseIndex(currentViewIndex, nbNumberSelectors)
    : nbViews;
}

function calculateBaseIndex(currentViewIndex, nbNumberSelectors) {
  if (nbNumberSelectors === 0) {
    throw new Error("nbNumberSelectors must be greater than 0");
  }

  let nbPagination = Math.floor(currentViewIndex / nbNumberSelectors);

  return nbPagination > 0
    ? nbPagination + nbPagination * nbNumberSelectors - 1
    : 0;
}

function filterRows(rowsArr, baseIndex, nbRows) {
  return rowsArr.filter(
    (row, index) => index < baseIndex + nbRows && index >= baseIndex
  );
}
