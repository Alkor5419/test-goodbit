import React from "react";
import { Provider } from "react-redux";
import { GlobalStyles } from "./global-styles";
import "antd/dist/antd.css";
import { Routing } from "pages/routing";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Routing />
    </Provider>
  );
};
