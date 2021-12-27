import { LobbyInfo } from "../model/api/LobbyInfo";
import { getNextId } from "../model/misc/getNextId";
import { ServerClass } from "./ServerClass";
import { WebSocketClient } from "./WebSocketClient";

export class BrowserHandler {
    public readonly lobbyMap: Map<number, LobbyInfo> = new Map<number, LobbyInfo>();

    constructor(private readonly server: ServerClass) {}

    public sendLobbyListToClient(client: WebSocketClient) {
        let lobbies: LobbyInfo[] = [];
        this.lobbyMap.forEach((lobby) => {
            lobbies.push(lobby);
        });

        client.send({ type: "ServerBrowserMessage", msg: { type: "ServerLobbiesResponse", clientId: client.playerInfo.id, lobbies } });
    }

    public sendLobbyListToAllClients(exceptionId?: number) {
        let lobbies: LobbyInfo[] = [];
        this.lobbyMap.forEach((lobby) => {
            lobbies.push(lobby);
        });

        this.server.clientMap.forEach((client) => {
            if (!exceptionId || exceptionId != client.playerInfo.id) {
                client.send({ type: "ServerBrowserMessage", msg: { type: "ServerLobbiesResponse", clientId: client.playerInfo.id, lobbies } });
            }
        });
    }

    public movePlayerToLobby(client: WebSocketClient, lobbyId: number) {
        let lobby: LobbyInfo | undefined = this.lobbyMap.get(lobbyId);
        if (lobby) {
            lobby.players.push(client.playerInfo);
            client.send({ type: "ServerBrowserMessage", msg: { type: "ServerEnterLobbyResponse", lobby } });
        }
    }

    public createLobby(client: WebSocketClient): number {
        let newId: number = getNextId();
        let lobbyInfo: LobbyInfo = { id: newId, name: client.playerInfo.name + "'s Game", players: [] };
        this.lobbyMap.set(newId, lobbyInfo);
        return newId;
    }

    public playerLeaveLobby(client: WebSocketClient, lobbyId: number) {
        let lobby: LobbyInfo | undefined = this.lobbyMap.get(lobbyId);
        if (lobby) {
            lobby.players = lobby.players.filter((player) => player.id != client.playerInfo.id);

            if (lobby.players.length == 0) {
                this.lobbyMap.delete(lobbyId);
            }

            this.server.browserHandler.sendLobbyListToAllClients();
        }
    }

    public clearPlayerFromLobbies(client: WebSocketClient) {
        this.lobbyMap.forEach((lobby) => {
            let index: number = lobby.players.findIndex((player) => player.id == client.playerInfo.id);
            if (index != -1) {
                this.playerLeaveLobby(client, lobby.id);
            }
        });
    }
}
