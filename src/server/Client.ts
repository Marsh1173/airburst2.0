import WebSocket from "ws";
import { ClientBrowserMessage, ClientGameMessage, ClientMessage, ServerMessage } from "../model/api/messages";
import { ServerClass } from "./ServerClass";

export abstract class Client {
    constructor(private readonly ws: WebSocket, private readonly server: ServerClass, private readonly clientMessageType: string) {
        ws.on("message", (msg: string) => {
            this.onReceiveMessage(JSON.parse(msg));
        });

        ws.onclose = this.onClose;
    }

    public async send(data: ServerMessage) {
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.log("Tried to send to a closed websocket");
        }
    }

    private onReceiveMessage(msg: ClientMessage) {
        if (msg.msg.type == this.clientMessageType) {
            this.receiveSpecificMessage(msg.msg);
        } else {
            console.log("UNKNOWN CLIENT MESSAGE TYPE: " + msg);
        }
    }
    protected abstract receiveSpecificMessage(msg: ClientGameMessage | ClientBrowserMessage): void;
    protected abstract onClose(): void;
}
