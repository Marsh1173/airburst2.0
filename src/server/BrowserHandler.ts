import { LobbyInfo } from "../model/api/LobbyInfo";
import { getNextId } from "../model/misc/getNextId";
import { ServerClass } from "./ServerClass";
import { WebSocketClient } from "./WebSocketClient";

export class BrowserHandler {
    public readonly lobbyMap: Map<number, LobbyInfo> = new Map<number, LobbyInfo>();

    constructor(private readonly server: ServerClass) {}

    public sendLobbyList(client: WebSocketClient) {
        let lobbies: LobbyInfo[] = [
            { name: "Test Lobby", id: getNextId(), players: [] },
            { name: "Test Lobby", id: getNextId(), players: [] },
            { name: "Test Lobby", id: getNextId(), players: [] },
            { name: "Test Lobby", id: getNextId(), players: [] },
            { name: "Test Lobby", id: getNextId(), players: [] },
            {
                name: "Test Lobby 2",
                id: getNextId(),
                players: [
                    { color: "", id: 0, name: "" },
                    { color: "", id: 0, name: "" },
                ],
            },
        ];

        // let lobbies: LobbyInfo[] = [];
        this.lobbyMap.forEach((lobby) => {
            lobbies.push(lobby);
        });

        client.send({ type: "ServerBrowserMessage", msg: { type: "ServerLobbiesResponse", clientId: client.playerInfo.id, lobbies } });
    }
}
