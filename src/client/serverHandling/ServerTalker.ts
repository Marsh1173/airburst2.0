import { ClientMessage } from "../../model/api/messages";
import { Global } from "../dataAccessors/GlobalInfo";
import { HomePresenter } from "../presenter/HomePresenter";
import { MessageHandlerClass } from "./MessageHandlerClass";

export class ServerTalker {
    private readonly wss: WebSocket;

    constructor(private messageHandler: MessageHandlerClass) {
        this.wss = new WebSocket(Global.serverInfo.url);

        this.wss.onmessage = (msg: MessageEvent) => {
            this.messageHandler.receiveMessage(JSON.parse(msg.data));
        };

        this.wss.onerror = (error) => {
            console.log("WebSocket error:");
            console.log(error);
            HomePresenter.showMessage("Websocket connection error  - try refreshing.", "bad");
        };
        this.wss.onopen = () => {
            console.log("Websocket connection success");
            HomePresenter.showMessage("Connection success!", "good", 2);
            HomePresenter.onWebSocketConnect();
        };
        this.wss.onclose = () => {
            console.log("Websocket connection closed");
            HomePresenter.showMessage("Connection closed - try refreshing.", "bad");
        };
    }

    public sendMessage(msg: ClientMessage) {
        this.wss.send(JSON.stringify(msg));
    }

    public close() {
        this.wss.close();
        Global.serverInfo.serverTalker = undefined;
    }

    public setMessageHandler(messageHandler: MessageHandlerClass) {
        this.messageHandler = messageHandler;
    }
}
