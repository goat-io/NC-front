import "./i18n/i18n";
import "react-app-polyfill/ie11";
import "./assets/architectui/base.scss";
import "./assets/styles.scss";

import React, { ComponentClass } from "react";

import { App } from "./layout/Main";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { unregister } from "./serviceWorker";

const rootElement = document.getElementById("root");

const renderApp = (Component: ComponentClass) => {
  ReactDOM.render(
    <HashRouter>
      <Component />
    </HashRouter>,
    rootElement
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept("./routes/MainRouter", () => {
    const NextApp = require("./routes/MainRouter").default;
    renderApp(NextApp);
  });
}
unregister();
