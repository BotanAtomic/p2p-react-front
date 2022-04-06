import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { SocketContextProvider } from "./context/SocketContext";
import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.render(
  <React.StrictMode>
      <link rel="stylesheet" href="//unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

      <SocketContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
