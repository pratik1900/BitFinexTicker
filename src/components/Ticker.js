import React from "react";

import { SiBitcoin } from "react-icons/si";

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
    <div className="tickerWidget">
      <div className="rows">
        <div className="leftRow">
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
          <div>
            <div>BTC/USD</div>
            <div>VOL: {Number(VOLUME).toLocaleString()} USD</div>
            <div>LOW: {Number(LOW).toLocaleString()}</div>
          </div>
        </div>
        <div className="row">
          <div>{Number(LAST_PRICE).toLocaleString()}</div>
          <div style={DAILY_CHANGE < 0 ? { color: "#A84448" } : {}}>
            {Number(DAILY_CHANGE).toLocaleString()} (
            {Number(DAILY_CHANGE_RELATIVE * 100).toFixed(2)}
            %)
          </div>
          <div>HIGH: {Number(HIGH).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default Ticker;
