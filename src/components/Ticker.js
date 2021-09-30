import React from "react";

import { SiBitcoin } from "react-icons/si";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

function Ticker({ tickerData }) {
  if (Array.isArray(tickerData)) {
    var [
      BID,
      BID_SIZE,
      ASK,
      ASK_SIZE,
      DAILY_CHANGE,
      DAILY_CHANGE_RELATIVE,
      LAST_PRICE,
      VOLUME,
      HIGH,
      LOW,
    ] = tickerData;
  }

  return (
    <div className="container">
      <div className="rows">
        <div className="section1">
          <div className="row1">
            <div className="tradingPairSection">
              <div>
                <SiBitcoin
                  style={{
                    fontSize: 42,
                    color: "#E6E6E6",
                    transform: `rotate(-13deg)`,
                    marginRight: 20,
                  }}
                />
              </div>
              <div className="tradingPair">BTC/USD</div>
            </div>

            <div className="whiteLetter">
              ${Number(LAST_PRICE).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="row2">
            <div className="whiteLetter">
              Vol: {Number(VOLUME).toLocaleString()} USD
            </div>
            <div className="changesSection">
              {DAILY_CHANGE < 0 && DAILY_CHANGE_RELATIVE < 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#A84448",
                  }}
                >
                  <div>
                    <GoTriangleDown />
                  </div>
                  <div>
                    {Math.abs(Number(DAILY_CHANGE).toLocaleString())} (
                    {Math.abs(Number(DAILY_CHANGE_RELATIVE * 100).toFixed(2))}
                    %)
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "var(--green)",
                  }}
                >
                  <span>
                    <GoTriangleUp />
                  </span>
                  {Number(DAILY_CHANGE).toLocaleString()} (
                  {Number(DAILY_CHANGE_RELATIVE * 100).toFixed(2)}
                  %)
                </div>
              )}
            </div>
          </div>
          <div className="row3">
            <div className="whiteLetter">
              Low: {Number(LOW).toLocaleString()}
            </div>

            <div className="whiteLetter">
              High: {Number(HIGH).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticker;
