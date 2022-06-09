import { GameInfo } from "../../model/api/GameInfo";
import { GamePlayerInfo } from "../../model/api/PlayerInfo";
import { Game } from "../../model/game/Game";
import { Global } from "../dataAccessors/GlobalInfo";
import { ClientPlayer } from "./ClientPlayer";
import { PlayerControllerClass } from "./controllers/PlayerControllerClass";
import { RenderHandler } from "./RenderHandler";

export class ClientGame extends Game {
  public readonly renderHandler: RenderHandler;
  // public readonly particleHandler: ParticleHandler

  public readonly players: ClientPlayer[] = [];

  constructor(gameInfo: GameInfo, canvas: HTMLCanvasElement) {
    super(gameInfo.mapSize);
    console.log(gameInfo);
    this.players = this.getClientPlayersFromGameInfo(gameInfo.players);
    this.renderHandler = new RenderHandler(canvas, this, gameInfo.mapSize);
  }

  private getClientPlayersFromGameInfo(players: GamePlayerInfo[]) {
    return players.map((player) => {
      if (Global.playerInfo.id == player.id) {
        return new ClientPlayer(player.id, player.name, player.pos, player.rotation);
      } else {
        return new ClientPlayer(player.id, player.name, player.pos, player.rotation);
      }
    });
  }

  public update(elapsedTime: number): void {
    super.update(elapsedTime);
    this.renderHandler.render();
  }
}
