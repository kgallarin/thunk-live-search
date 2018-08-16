import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import Store from "./store";
import "normalize.css/normalize.css";

let store = Store();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
