import { LobbyInfo } from "../../model/api/LobbyInfo";
import { PlayerInfo } from "../../model/api/PlayerInfo";
import { Global } from "../dataAccessors/GlobalInfo";
import { HomePresenter } from "./HomePresenter";

export class BrowserPresenter {
    public static currentLobbies: LobbyInfo[] = [];
    public static currentLobby: LobbyInfo = { id: -2, name: "", players: [] };
    public static updateLobbies: (lobbies: LobbyInfo[]) => void = (lobbies: LobbyInfo[]) => {
        BrowserPresenter.updateLobbies = (lobbies: LobbyInfo[]) => {
            BrowserPresenter.currentLobbies = lobbies;
        };
    };
    public static resetUpdateLobbyFunc() {
        BrowserPresenter.updateLobbies = (lobbies: LobbyInfo[]) => {
            BrowserPresenter.currentLobbies = lobbies;
        };
    }
    public static attemptCreateNewLobby() {
        if (Global.serverInfo.serverTalker) {
            Global.serverInfo.serverTalker.sendMessage({
                clientId: Global.playerInfo.id,
                msg: { type: "ClientBrowserMessage", msg: { type: "ClientCreateGame", clientInfo: Global.playerInfo } },
            });
        } else {
            HomePresenter.showMessage("Connection error.", "bad");
        }
    }
    public static attemptJoinLobby(lobbyId: number) {
        if (Global.serverInfo.serverTalker) {
            Global.serverInfo.serverTalker.sendMessage({
                clientId: Global.playerInfo.id,
                msg: { type: "ClientBrowserMessage", msg: { type: "ClientEnterGame", clientInfo: Global.playerInfo, lobbyId } },
            });
        } else {
            HomePresenter.showMessage("Connection error.", "bad");
        }
    }
    public static attemptLeaveLobby() {
        if (Global.serverInfo.serverTalker) {
            Global.serverInfo.serverTalker.sendMessage({
                clientId: Global.playerInfo.id,
                msg: {
                    type: "ClientBrowserMessage",
                    msg: { type: "ClientLeaveLobby", clientInfo: Global.playerInfo, lobbyId: BrowserPresenter.currentLobby.id },
                },
            });
            HomePresenter.changeHomeScreen("browser");
        } else {
            HomePresenter.showMessage("Connection error.", "bad");
        }
    }
    public static joinLobby(lobbyInfo: LobbyInfo) {
        BrowserPresenter.currentLobby = lobbyInfo;
        HomePresenter.changeHomeScreen("lobby");
    }
}
