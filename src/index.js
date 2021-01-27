import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import * as serviceWorker from "./serviceWorker";
import AppContextProvider from "./AppContext";

Amplify.configure({
  ...awsmobile,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
});

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
