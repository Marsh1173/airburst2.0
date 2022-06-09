import { GameInfo } from "../../model/api/GameInfo";
import { Looper } from "../../model/misc/Looper/Looper";
import { Global } from "../dataAccessors/GlobalInfo";
import { ClientGame } from "../game-model/ClientGame";
import { GameMessageHandler } from "../serverHandling/GameMessageHandler";

export class GamePresenter {
  public static initialGameInfo: GameInfo = { balls: [], mapSize: 0, players: [], startTime: 0 };
  public static game: ClientGame | undefined = undefined;
  public static gameScreenInterface: GameScreenInterface | undefined = undefined;

  public static onFinishRendering() {
    if (Global.serverInfo.serverTalker && !GamePresenter.game && this.gameScreenInterface) {
      GamePresenter.game = new ClientGame(GamePresenter.initialGameInfo, this.gameScreenInterface.canvas);
      Global.serverInfo.serverTalker.setMessageHandler(new GameMessageHandler(GamePresenter.game));
      Looper.addUpdateable(GamePresenter.game);
    }
  }

  public static onGameEnd() {
    if (GamePresenter.game) {
      Looper.removeUpdateable(GamePresenter.game.id);
      GamePresenter.game = undefined;
    }
  }
}
export interface GameScreenInterface {
  canvas: HTMLCanvasElement;
}
