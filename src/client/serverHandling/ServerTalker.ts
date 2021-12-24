import { ClientMessage } from "../../model/api/messages";
import { Global } from "../dataAccessors/GlobalInfo";
import { MessageHandlerInterface } from "./MessageHandlerInterface";

export class ServerTalker {
    private readonly wss: WebSocket;

    constructor(private messageHandler: MessageHandlerInterface) {
        this.wss = new WebSocket(Global.serverInfo.url);

        this.wss.onmessage = (message: MessageEvent) => {
            this.messageHandler.receiveMessage(message.data.valueOf() as ClientMessage);
        };

        this.wss.onerror = (error) => {
            console.log("WebSocket error");
            console.log(error);
        };
        this.wss.onopen = () => {
            console.log("Websocket connection succeeded");
        };
        this.wss.onclose = () => {
            console.log("Websocket connection closed");
        };
    }

    public connect() {}

    public sendMessage() {}

    public close() {}

    public setMessageHandler(messageHandler: MessageHandlerInterface) {
        this.messageHandler = messageHandler;
    }
}
