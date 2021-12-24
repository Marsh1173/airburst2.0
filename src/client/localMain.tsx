import React, { Component, createElement } from "react";
import ReactDOM from "react-dom";
import { ClientConnectMessage } from "../model/api/messages";
import { MessageHandlerInterface } from "./serverHandling/MessageHandlerInterface";
import { ServerTalker } from "./serverHandling/ServerTalker";

class MainDiv extends Component<{}, {}> {
    render() {
        return <p>hi</p>;
    }
}
class MessagePrinter implements MessageHandlerInterface {
    receiveMessage(data: ClientConnectMessage) {
        console.log(data);
    }
}

let serverTalker: ServerTalker = new ServerTalker(new MessagePrinter());
serverTalker.connect();

const domContainer = document.querySelector("#reactDom");
ReactDOM.render(createElement(MainDiv), domContainer);