import { GameInfo } from "../../model/api/GameInfo";
import { GamePlayerInfo } from "../../model/api/PlayerInfo";
import { BallInfo } from "../../model/api/BallInfo";
import { Game } from "../../model/game/Game";
import { Global } from "../dataAccessors/GlobalInfo";
import { ClientBall } from "./ClientBall";
import { ClientPlayer } from "./ClientPlayer";
import { PlayerControllerClass } from "./controllers/PlayerControllerClass";
import { RenderHandler } from "./RenderHandler";
import { GameMessageHandler } from "../serverHandling/GameMessageHandler";

export class ClientGame extends Game {
  public readonly renderHandler: RenderHandler;
  // public readonly particleHandler: ParticleHandler

  public readonly players: Map<number, ClientPlayer>;
  public readonly balls: Map<number, ClientBall>;
  public mainPlayer: ClientPlayer | undefined = undefined;

  constructor(private readonly messageHandler: GameMessageHandler, gameInfo: GameInfo, canvas: HTMLCanvasElement) {
    super(gameInfo.mapSize);
    console.log(gameInfo);

    this.players = this.getClientPlayersFromGameInfo(gameInfo.players);
    this.balls = this.getClientBallsFromGameInfo(gameInfo.balls);
    this.renderHandler = new RenderHandler(canvas, this, this.mapSize);

    this.setMainPlayerKeyBoardListeners();
  }

  private getClientPlayersFromGameInfo(players: GamePlayerInfo[]): Map<number, ClientPlayer> {
    let client_map: Map<number, ClientPlayer> = new Map<number, ClientPlayer>();
    players.forEach((player) => {
      let newPlayer: ClientPlayer = new ClientPlayer(player.id, player.name, player.color, player.pos, player.rotation);
      if (Global.playerInfo.id == player.id) {
        this.messageHandler.setLocalPlayerAPI(newPlayer);
        this.mainPlayer = newPlayer;
        client_map.set(player.id, newPlayer);
      } else {
        this.messageHandler.setRemotePlayerAPI(newPlayer);
        client_map.set(player.id, newPlayer);
      }
    });
    return client_map;
  }

  private getClientBallsFromGameInfo(balls: BallInfo[]): Map<number, ClientBall> {
    let ball_map: Map<number, ClientBall> = new Map<number, ClientBall>();
    balls.forEach((ball) => {
      let newBall: ClientBall = new ClientBall(ball.id, ball.mom, ball.pos);
      this.messageHandler.setBallAPI(newBall);
      ball_map.set(ball.id, newBall);
    });
    return ball_map;
  }

  public update(elapsedTime: number): void {
    super.update(elapsedTime);
    this.renderHandler.render();
  }

  private setMainPlayerKeyBoardListeners() {
    window.onkeydown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          if (this.mainPlayer && !this.mainPlayer.actionsNextFrame.rotateCounterClockwise) {
            this.mainPlayer.actionsNextFrame.rotateCounterClockwise = true;
            // TODO: send message to server
          }
          break;
        case "ArrowRight":
        case "KeyD":
          if (this.mainPlayer && !this.mainPlayer.actionsNextFrame.rotateClockwise) {
            this.mainPlayer.actionsNextFrame.rotateClockwise = true;
            // TODO: send message to server
          }
          break;
      }
    };
    window.onkeyup = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          if (this.mainPlayer && this.mainPlayer.actionsNextFrame.rotateCounterClockwise) {
            this.mainPlayer.actionsNextFrame.rotateCounterClockwise = false;
          }
          break;
        case "ArrowRight":
        case "KeyD":
          if (this.mainPlayer && this.mainPlayer.actionsNextFrame.rotateClockwise) {
            this.mainPlayer.actionsNextFrame.rotateClockwise = false;
          }
          break;
      }
    };
  }
}
