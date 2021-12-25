import { PlayerInfo } from "./PlayerInfo";
import { LobbyInfo } from "./LobbyInfo";

export interface ClientMessage {
    msg: ClientBrowserMessage;
    clientId: number;
}

export interface ClientBrowserMessage {
    type: "ClientBrowserMessage";
    msg: ClientRequestLobbies | ClientEnterGame | ClientCreateGame | ClientLeaveLobby;
}

export interface ClientRequestLobbies {
    type: "ClientRequestLobbies";
}

export interface ClientEnterGame {
    type: "ClientEnterGame";
    clientInfo: PlayerInfo;
    lobbyId: number;
}

export interface ClientCreateGame {
    type: "ClientCreateGame";
    clientInfo: PlayerInfo;
}

export interface ClientLeaveLobby {
    type: "ClientLeaveLobby";
    clientInfo: PlayerInfo;
    lobbyId: number;
}

export type ServerMessage = ServerErrorMessage | ServerBrowserMessage;

export interface ServerErrorMessage {
    type: "ServerErrorMessage";
    msg: string;
}
export interface ServerBrowserMessage {
    type: "ServerBrowserMessage";
    msg: ServerLobbiesResponse | ServerEnterLobbyResponse;
}
export interface ServerLobbiesResponse {
    type: "ServerLobbiesResponse";
    lobbies: LobbyInfo[];
    clientId: number;
}
export interface ServerEnterLobbyResponse {
    type: "ServerEnterLobbyResponse";
    lobby: LobbyInfo;
}

// export interface ServerLobbyMessage {
//     type: "ServerLobbyMessage";
//     msg: ;
// }
