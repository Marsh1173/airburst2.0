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
            this.server.onCloseConnection(this);
        };
    }

    public async send(data: ServerMessage) {
        if (this.ws.readyState === this.ws.OPEN) {
            let jsonData: string = JSON.stringify(data);
            this.ws.send(jsonData);
        } else {
            console.log("Tried to send to a closed websocket");
        }
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
                this.server.browserHandler.sendLobbyListToClient(this);
                break;
            case "ClientCreateGame":
                this.updatePlayerInfo(msg.msg.clientInfo);
                let lobbyId: number = this.server.browserHandler.createLobby(this);
                this.server.browserHandler.movePlayerToLobby(this, lobbyId);
                this.server.browserHandler.sendLobbyListToAllClients(msg.msg.clientInfo.id);
                break;
            case "ClientEnterGame":
                this.updatePlayerInfo(msg.msg.clientInfo);
                this.server.browserHandler.movePlayerToLobby(this, msg.msg.lobbyId);
                this.server.browserHandler.sendLobbyListToAllClients(msg.msg.clientInfo.id);
                break;
            case "ClientLeaveLobby":
                this.updatePlayerInfo(msg.msg.clientInfo);
                this.server.browserHandler.playerLeaveLobby(this, msg.msg.lobbyId);
                break;
            default:
                throw new Error("unknown client message type: " + msg);
        }
    }

    private updatePlayerInfo(playerInfo: PlayerInfo) {
        this.playerInfo.color = playerInfo.color;
        this.playerInfo.name = playerInfo.name;
        this.playerInfo.id = playerInfo.id;
    }
}
