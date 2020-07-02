import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";

serviceWorker.register();

ReactDOM.render(<App />, document.querySelector("#root"));
