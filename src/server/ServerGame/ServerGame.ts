import { GamePlayerInfo, PlayerInfo } from "../../model/api/PlayerInfo";
import { ServerClass } from "../ServerClass";
import { WebSocketClient } from "../Browser/WebSocketClient";
import { BallInfo } from "../../model/api/BallInfo";
import { getNextId } from "../../model/misc/getNextId";
import { Game } from "../../model/game/Game";
import { ServerPlayer } from "./ServerPlayer";
import { ServerBall } from "./ServerBall";

export class ServerGame extends Game {
  public readonly clientMap: Map<number, WebSocketClient> = new Map<number, WebSocketClient>();
  public readonly ballMap: Map<number, WebSocketClient> = new Map<number, WebSocketClient>();

  public readonly players: Map<number, ServerPlayer> = new Map<number, ServerPlayer>();
  public readonly balls: Map<number, ServerBall> = new Map<number, ServerBall>();

  constructor(public readonly id: number, private readonly server: ServerClass, clients: WebSocketClient[]) {
    super(clients.length * 100 + 400);
    clients.forEach((client) => {
      this.clientMap.set(client.playerInfo.id, client);
    });
  }

  public start() {
    let playerCount = this.clientMap.size;
    let index: number = 0;

    let playerDatas: GamePlayerInfo[] = [];
    let ballDatas: BallInfo[] = [];
    let distFromCenter: number = this.mapSize / 3;
    this.clientMap.forEach((client) => {
      let angle: number = (Math.PI * 2 * index) / playerCount + Math.PI / 4;
      playerDatas.push({
        id: client.playerInfo.id,
        name: client.playerInfo.name,
        color: client.playerInfo.color,
        pos: {
          x: this.mapSize / 2 + distFromCenter * Math.cos(angle),
          y: this.mapSize / 2 + distFromCenter * Math.sin(angle),
        },
        rotation: angle + Math.PI,
      });
      ballDatas.push({
        id: getNextId(),
        pos: { x: this.mapSize / 2, y: this.mapSize / 2 },
        mom: { x: 0, y: 0 },
      });
      index++;
    });

    this.clientMap.forEach((client) => {
      client.send({
        type: "ServerBrowserMessage",
        msg: {
          type: "ServerGameStart",
          gameInfo: { players: playerDatas, mapSize: this.mapSize, balls: ballDatas, startTime: Date.now() },
        },
      });
    });
  }
}

export interface ServerGameMessage {
  type: "ServerGameMessage";
  msg: string;
}
