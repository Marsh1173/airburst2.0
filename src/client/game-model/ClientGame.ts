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

  public readonly players: ClientPlayer[] = [];
  public readonly balls: ClientBall[] = [];
  public mainPlayer: ClientPlayer | undefined = undefined;

  constructor(private readonly messageHandler: GameMessageHandler, gameInfo: GameInfo, canvas: HTMLCanvasElement) {
    super(gameInfo.mapSize);
    console.log(gameInfo);

    this.players = this.getClientPlayersFromGameInfo(gameInfo.players);
    this.balls = this.getClientBallsFromGameInfo(gameInfo.balls);
    this.renderHandler = new RenderHandler(canvas, this, this.mapSize);

    this.setMainPlayerKeyBoardListeners();
  }

  private getClientPlayersFromGameInfo(players: GamePlayerInfo[]): ClientPlayer[] {
    return players.map((player) => {
      let newPlayer: ClientPlayer = new ClientPlayer(player.id, player.name, player.color, player.pos, player.rotation);
      if (Global.playerInfo.id == player.id) {
        this.messageHandler.setLocalPlayerAPI(newPlayer);
        this.mainPlayer = newPlayer;
        return newPlayer;
      } else {
        this.messageHandler.setRemotePlayerAPI(newPlayer);
        return newPlayer;
      }
    });
  }

  private getClientBallsFromGameInfo(balls: BallInfo[]): ClientBall[] {
    return balls.map((ball) => {
      let newBall: ClientBall = new ClientBall(ball.id, ball.mom, ball.pos);
      this.messageHandler.setBallAPI(newBall);
      return newBall;
    });
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
