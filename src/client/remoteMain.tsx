import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { Global } from "./dataAccessors/GlobalInfo";
import { LocalStorageHandler } from "./dataAccessors/LocalStorageHandler";
import { Home } from "./view-react/Home";

class MainDiv extends Component<{}, {}> {
    render() {
        return <Home></Home>;
    }
}

LocalStorageHandler.initLocalStorage();
Global.serverInfo.url = `wss://${location.host}:3000`;

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(MainDiv), domContainer);
