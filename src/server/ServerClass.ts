import * as https from "https";
import * as http from "http";
import { WebSocket, Server } from "ws";
import { WebSocketClient } from "./Browser/WebSocketClient";
import { getNextId } from "../model/misc/getNextId";
import { PlayerInfo } from "../model/api/PlayerInfo";
import { ClientMessage } from "../model/api/messages";
import { BrowserHandler } from "./Browser/BrowserHandler";
import { ServerGame } from "./ServerGame/ServerGame";
import { LobbyInfo } from "../model/api/LobbyInfo";

export class ServerClass {
    private readonly socket: Server;
    private readonly clientMap: Map<number, WebSocketClient>;
    private readonly gameMap: Map<number, ServerGame>;

    public readonly browserHandler: BrowserHandler;

    constructor(private readonly server: http.Server | https.Server) {
        this.clientMap = new Map<number, WebSocketClient>();
        this.gameMap = new Map<number, ServerGame>();
        this.socket = new WebSocket.Server({ server });
        this.browserHandler = new BrowserHandler(this);

        this.socket.on("connection", (ws) => {
            this.onConnect(ws);
        });
    }

    public start(port: number, urlToDisplay: string) {
        this.server.listen(port, function () {
            console.log("Listening on " + urlToDisplay);
        });
    }

    private onConnect(ws: WebSocket) {
        let playerInfo: PlayerInfo = { name: "", id: getNextId(), color: "" };
        let newClient: WebSocketClient = new WebSocketClient(ws, this, playerInfo);
        this.clientMap.set(playerInfo.id, newClient);
        this.browserHandler.clientMap.set(playerInfo.id, newClient);

        console.log("Connected to " + playerInfo.id);
    }

    public onCloseConnection(client: WebSocketClient) {
        this.browserHandler.clearPlayerFromLobbies(client);
        this.clientMap.delete(client.playerInfo.id);
        console.log("Disconnecting from " + client.playerInfo.id);
    }

    public startGame(clients: WebSocketClient[]) {
        let id: number = getNextId();
        let game: ServerGame = new ServerGame(id, this, clients);

        this.gameMap.set(id, game);
        game.start();
    }
}
