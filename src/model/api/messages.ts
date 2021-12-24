import { PlayerInfo } from "./PlayerInfo";
import { LobbyInfo } from "./LobbyInfo";

export interface ClientMessage {
    msg: ClientBrowserMessage;
    clientId: number;
}

export interface ClientBrowserMessage {
    type: "ClientBrowserMessage";
    msg: ClientRequestLobbies | ClientEnterGame | ClientCreateGame;
}

export interface ClientRequestLobbies {
    type: "ClientRequestLobbies";
}

export interface ClientEnterGame {
    type: "ClientEnterGame";
    clientInfo: PlayerInfo;
}

export interface ClientCreateGame {
    type: "ClientCreateGame";
    gameName: string;
    clientInfo: PlayerInfo;
}

export type ServerMessage = ServerErrorMessage | ServerBrowserMessage;

export interface ServerErrorMessage {
    type: "ServerErrorMessage";
    msg: string;
}
export interface ServerBrowserMessage {
    type: "ServerBrowserMessage";
    msg: ServerLobbiesResponse;
}
export interface ServerLobbiesResponse {
    type: "ServerLobbiesResponse";
    lobbies: LobbyInfo[];
    clientId: number;
}
