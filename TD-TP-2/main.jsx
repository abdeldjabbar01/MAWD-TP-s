import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // makes the Redux store available to every component
import store from "./store";
import App from "./App";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
