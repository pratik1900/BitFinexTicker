import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketUrl } from "./constants";
import {
  fetchDataSuccess,
  fetchDataFailed,
  fetchDataClear,
} from "./store/actions";

import Ticker from "./components/Ticker";

function App() {
  const dispatch = useDispatch();
  // const [tickerData, setTickerData] = useState(null);

  const tickerData = useSelector(state => state.data);
  const loading = useSelector(state => state.loading);
  const errors = useSelector(state => state.errors);

  let ws; //websocket instance

  const init = () => {
    ws = new WebSocket(socketUrl);

    const onOpenHandler = () => {
      console.log("CONNECTED......");
      let config = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tBTCUSD",
      });
      ws.send(config);
    };
    const onMessageHandler = message => {
      let data = JSON.parse(message.data);
      if (Array.isArray(data[1])) {
        console.log("Setting Ticker DAta:", data[1]);
        dispatch(fetchDataSuccess(data[1]));
      }
    };
    const onCloseHandler = () => {
      console.log("DISCONNECTED.......");
    };

    const onErrorHandler = error => {
      console.log("ERROR:", { error });
      dispatch(fetchDataFailed());
    };

    ws.onopen = onOpenHandler;
    ws.onmessage = onMessageHandler;
    ws.onclose = onCloseHandler;
    ws.onerror = onErrorHandler;
  };

  useEffect(() => {
    // init();
  }, []);

  const connectHandler = () => {
    console.log("RETRYING");
    init();
  };

  const disconnectHandler = () => {
    ws.close(); //THROWING ERROR
    dispatch(fetchDataClear());
  };

  return (
    <div className="App">
      {loading ? (
        "LOADING"
      ) : !tickerData ? (
        <div>
          <div>{errors}</div>
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
