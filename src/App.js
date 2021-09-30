import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketUrl } from "./constants";
import {
  fetchDataSuccess,
  fetchDataFailed,
  fetchDataClear,
} from "./store/actions";

import Ticker from "./components/Ticker";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  // const [tickerData, setTickerData] = useState(null);

  const tickerData = useSelector(state => state.data);
  const loading = useSelector(state => state.loading);
  const errors = useSelector(state => state.errors);

  const [wsInstance, setWsInstance] = useState(null); //websocket instance
  // const [timeOutId, setTimeOutId] = useState(null); //to check for network disconnection;

  let timeOutId = null;
  let intervalId = null;

  const init = () => {
    let ws = new WebSocket(socketUrl);

    const onOpenHandler = () => {
      console.log("CONNECTED......");
      let config = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tBTCUSD",
      });
      ws.send(config);
      intervalId = setInterval(Ping, 5000);
    };
    const onMessageHandler = message => {
      // console.log(message);
      let data = JSON.parse(message.data);
      if (Array.isArray(data[1])) {
        dispatch(fetchDataSuccess(data[1]));
      }
      if (data.event === "pong") {
        Pong();
      }
    };
    const onCloseHandler = event => {
      clearInterval(intervalId);
      dispatch(fetchDataClear());
      console.log("DISCONNECTED.......");
      console.log(event);
    };

    const onErrorHandler = error => {
      console.log("ERROR:", { error });
      dispatch(fetchDataFailed());
    };

    const Ping = () => {
      // only ping if no previous un-answered pings
      if (timeOutId === null) {
        console.log("Ping");
        ws.send(
          JSON.stringify({
            event: "ping",
            cid: 3426,
          })
        );
        let tm = setTimeout(function () {
          /// ---connection closed ///
          console.log("BOOM");
          dispatch(fetchDataFailed());
        }, 10000);
        timeOutId = tm;
      }
    };

    const Pong = () => {
      console.log("Pong");
      if (timeOutId) clearTimeout(timeOutId);
      timeOutId = null;
    };

    ws.onopen = onOpenHandler;
    ws.onmessage = onMessageHandler;
    ws.onclose = onCloseHandler;
    ws.onerror = onErrorHandler;

    setWsInstance(ws);
  };

  const connectHandler = () => {
    console.log("INIT");
    timeOutId = null;
    init();
  };

  const disconnectHandler = () => {
    if (timeOutId) clearTimeout(timeOutId);
    // timeOutId = null;
    wsInstance.close();
  };

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : !tickerData ? (
        <div>
          <div className="error">{errors}</div>
          <div>
            <input
              type="button"
              value={errors ? "Retry" : "Connect"}
              onClick={connectHandler}
            />
          </div>
        </div>
      ) : (
        <>
          <Ticker tickerData={tickerData} />
          <input
            className="btn"
            type="button"
            value={"Disconnect"}
            onClick={disconnectHandler}
          />
        </>
      )}
    </div>
  );
}

export default App;
