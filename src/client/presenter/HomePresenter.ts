import { GameInfo } from "../../model/api/GameInfo";
import { Global } from "../dataAccessors/GlobalInfo";
import { LocalStorageHandler } from "../dataAccessors/LocalStorageHandler";
import { BrowserMessageHandler } from "../serverHandling/BrowserMessageHandler";
import { GameMessageHandler } from "../serverHandling/GameMessageHandler";
import { ServerTalker } from "../serverHandling/ServerTalker";
import { GamePresenter } from "./GamePresenter";

export class HomePresenter {
  public static changeHomeScreen: (newScreenName: string) => void = () => {};
  public static showMessage: (msg: string, type: "good" | "bad" | "neutral", seconds?: number) => void = () => {};

  public static initWebsocket() {
    Global.serverInfo.serverTalker = new ServerTalker(new BrowserMessageHandler());
  }

  public static onWebSocketConnect() {
    HomePresenter.changeHomeScreen("login");
  }

  public static onLogin(name: string, color: string) {
    LocalStorageHandler.savePlayerInfo(name, color);
    Global.playerInfo.color = color;
    Global.playerInfo.name = name;

    if (Global.serverInfo.serverTalker) {
      Global.serverInfo.serverTalker.sendMessage({
        clientId: Global.playerInfo.id,
        msg: { type: "ClientBrowserMessage", msg: { type: "ClientRequestLobbies" } },
      });
      HomePresenter.changeHomeScreen("browser");
    } else {
      HomePresenter.showMessage("Connection error.", "bad");
    }
  }

  public static startGame(gameInfo: GameInfo) {
    if (Global.serverInfo.serverTalker) {
      GamePresenter.initialGameInfo = gameInfo;
      HomePresenter.changeHomeScreen("game");
    } else {
      HomePresenter.showMessage("Connection error.", "bad");
    }
  }
}
