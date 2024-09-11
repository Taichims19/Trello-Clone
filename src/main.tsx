import * as React from "react";
import ReactDOM from "react-dom/client";
import { TrelloApp } from "./TrelloApp";
import "./styles.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

const clientId =
  "57099475778-uofde3chgs8sk25s7vnvb01p57u5kav1.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <BrowserRouter>
          {/* <DndProvider backend={HTML5Backend}> */}
          <TrelloApp />
          {/* </DndProvider> */}
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
