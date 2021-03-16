import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import * as serviceWorker from "./serviceWorker";
import AppContextProvider from "./AppContext";
import FileUploadContextProvider from "./FileUploadContext";

Amplify.configure(aws_exports);
ReactDOM.render(
  <AppContextProvider>
    <FileUploadContextProvider>
      <App />
    </FileUploadContextProvider>
  </AppContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
