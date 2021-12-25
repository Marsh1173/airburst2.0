import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { LocalStorageHandler } from "./dataAccessors/LocalStorageHandler";
import { Home } from "./view-react/Home";

class MainDiv extends Component<{}, {}> {
    render() {
        return <Home></Home>;
    }
}

LocalStorageHandler.initLocalStorage();

const domContainer = document.querySelector("#reactDom");
// setTimeout(() => {
//     ReactDOM.render(createElement(MainDiv), domContainer);
// }, 1000);
ReactDOM.render(createElement(MainDiv), domContainer);
