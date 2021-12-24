import WebSocket from "ws";
import { ClientBrowserMessage, ClientMessage, ServerMessage } from "../model/api/messages";
import { PlayerInfo } from "../model/api/PlayerInfo";
import { ServerClass } from "./ServerClass";

export class WebSocketClient {
    constructor(private readonly ws: WebSocket, private readonly server: ServerClass, public readonly playerInfo: PlayerInfo) {
        ws.on("message", (msg: string) => {
            this.onReceiveMessage(JSON.parse(msg));
        });

        ws.onclose = () => {
            this.server.onCloseConnection(this.playerInfo.id);
        };
    }

    public send(data: ServerMessage) {
        this.ws.send(JSON.stringify(data));
    }

    private onReceiveMessage(msg: ClientMessage) {
        switch (msg.msg.type) {
            case "ClientBrowserMessage":
                this.onReceiveBrowserMessage(msg.msg);
                break;
            default:
                throw new Error("unknown client message type: " + msg);
        }
    }

    private onReceiveBrowserMessage(msg: ClientBrowserMessage) {
        switch (msg.msg.type) {
            case "ClientRequestLobbies":
                this.server.browserHandler.sendLobbyList(this);
                break;
            default:
                throw new Error("unknown client message type: " + msg);
        }
    }
}
