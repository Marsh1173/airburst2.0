import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { Global } from "./dataAccessors/GlobalInfo";
import { Home } from "./view-react/Home";

class MainDiv extends Component<{}, {}> {
    render() {
        return <Home></Home>;
    }
}

Global.serverInfo.url = `wss://${location.host}:3000`;

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(MainDiv), domContainer);
