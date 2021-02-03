import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { StateProvider } from "./context/StateProvider";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { initialState, reducer } from "./context/reducer";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  // <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}>
    <Provider store={store}>
      <App />
    </Provider>
  </StateProvider>,
  // </React.StrictMode>,
  RootDirectory
);

serviceWorker.register();
