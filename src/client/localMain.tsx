import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { Home } from "./view-react/Home";

class MainDiv extends Component<{}, {}> {
    render() {
        return <Home></Home>;
    }
}

const domContainer = document.querySelector("#reactDom");
// setTimeout(() => {
//     ReactDOM.render(createElement(MainDiv), domContainer);
// }, 1000);
ReactDOM.render(createElement(MainDiv), domContainer);
