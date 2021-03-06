import WebSocket from "ws";
import { ClientGameMessage, ClientMessage } from "../../model/api/messages";
import { Client } from "../Client";
import { ServerClass } from "../ServerClass";

export class GameClient extends Client {
  constructor(ws: WebSocket, server: ServerClass) {
    super(ws, server, "ClientGameMessage");
  }

  protected receiveSpecificMessage(msg: ClientGameMessage): void {
    console.log("Method not implemented.");
  }
  protected onClose(): void {
    console.log("Method not implemented.");
  }
}
