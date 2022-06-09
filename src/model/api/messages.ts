import { PlayerInfo } from "./PlayerInfo";
import { LobbyInfo } from "./LobbyInfo";
import { GameInfo } from "./GameInfo";
import { ServerGameMessage } from "../../server/ServerGame/ServerGame";

export interface ClientMessage {
    msg: ClientBrowserMessage | ClientGameMessage;
    clientId: number;
}

export interface ClientGameMessage {
    type: "ClientGameMessage";
    msg: ClientPressKey;
}
export interface ClientPressKey {
    type: "ClientPressKey";
    key: string;
}

export interface ClientBrowserMessage {
    type: "ClientBrowserMessage";
    msg: ClientRequestLobbies | ClientEnterLobby | ClientCreateLobby | ClientLeaveLobby | ClientStartGame;
}

export interface ClientRequestLobbies {
    type: "ClientRequestLobbies";
}

export interface ClientEnterLobby {
    type: "ClientEnterLobby";
    clientInfo: PlayerInfo;
    lobbyId: number;
}

export interface ClientCreateLobby {
    type: "ClientCreateLobby";
    clientInfo: PlayerInfo;
}

export interface ClientLeaveLobby {
    type: "ClientLeaveLobby";
    clientInfo: PlayerInfo;
    lobbyId: number;
}

export interface ClientStartGame {
    type: "ClientStartGame";
    lobbyId: number;
    playerId: number;
}

export type ServerMessage = ServerErrorMessage | ServerBrowserMessage | ServerGameMessage;

export interface ServerErrorMessage {
    type: "ServerErrorMessage";
    msg: string;
}
export interface ServerBrowserMessage {
    type: "ServerBrowserMessage";
    msg: ServerLobbiesResponse | ServerEnterLobbyResponse | ServerGameStart;
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
export interface ServerGameStart {
    type: "ServerGameStart";
    gameInfo: GameInfo;
}
