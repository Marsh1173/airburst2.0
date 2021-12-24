import { Global } from "../dataAccessors/GlobalInfo";
import { BrowserMessageHandler } from "../serverHandling/BrowserMessageHandler";
import { ServerTalker } from "../serverHandling/ServerTalker";

export class HomePresenter {
    public static changeHomeScreen: (newScreenName: string) => void = () => {};
    public static showMessage: (msg: string, type: "good" | "bad" | "neutral") => void = () => {};

    public static initWebsocket() {
        Global.serverInfo.serverTalker = new ServerTalker(new BrowserMessageHandler());
    }

    public static onWebSocketConnect() {
        HomePresenter.changeHomeScreen("login");
    }

    public static onLogin() {
        if (Global.serverInfo.serverTalker) {
            Global.serverInfo.serverTalker.sendMessage({
                clientId: Global.playerInfo.id,
                msg: { type: "ClientBrowserMessage", msg: { type: "ClientRequestLobbies" } },
            });
        }
        HomePresenter.changeHomeScreen("browser");
    }
}
