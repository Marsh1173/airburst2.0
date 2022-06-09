import { GamePlayerInfo, PlayerInfo } from "../../model/api/PlayerInfo";
import { ServerClass } from "../ServerClass";
import { WebSocketClient } from "../Browser/WebSocketClient";
import { BallInfo } from "../../model/api/BallInfo";

export class ServerGame {
  public readonly clientMap: Map<number, WebSocketClient> = new Map<number, WebSocketClient>();
  public readonly ballMap: Map<number, WebSocketClient> = new Map<number, WebSocketClient>();
  public readonly mapDimensions: number;

  constructor(private readonly id: number, private readonly server: ServerClass, clients: WebSocketClient[]) {
    clients.forEach((client) => {
      this.clientMap.set(client.playerInfo.id, client);
    });
    this.mapDimensions = clients.length * 200 + 600;
  }

  public start() {
    let playerCount = this.clientMap.size;
    let index: number = 0;

    let playerDatas: GamePlayerInfo[] = [];
    let distFromCenter: number = this.mapDimensions / 3;
    this.clientMap.forEach((client) => {
      let angle: number = (Math.PI * 2 * index) / playerCount;
      playerDatas.push({
        id: client.playerInfo.id,
        name: client.playerInfo.name,
        color: client.playerInfo.color,
        pos: {
          x: this.mapDimensions / 2 + distFromCenter * Math.cos(angle),
          y: this.mapDimensions / 2 + distFromCenter * Math.sin(angle),
        },
        rotation: angle + Math.PI,
      });
      index++;
    });

    let ballDatas: BallInfo[] = [];

    this.clientMap.forEach((client) => {
      client.send({
        type: "ServerBrowserMessage",
        msg: {
          type: "ServerGameStart",
          gameInfo: { players: playerDatas, mapSize: this.mapDimensions, balls: [], startTime: Date.now() },
        },
      });
    });
  }
}

export interface ServerGameMessage {
  type: "ServerGameMessage";
  msg: string;
}
