import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import OnlineContextProvider from "./context/online-context";

import App from "./components/App";

serviceWorker.register();

ReactDOM.render(
  <OnlineContextProvider>
    <App />
  </OnlineContextProvider>,
  document.querySelector("#root")
);
