export type ClientMessage = ClientConnectMessage;

export interface ClientConnectMessage {
    type: "ClientConnectMessage";
    msg: string;
}

export type ServerMessage = ServerErrorMessage;

export interface ServerErrorMessage {
    type: "ServerErrorMessage";
    msg: string;
}
