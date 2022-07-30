import { GameInfo } from "../../model/api/GameInfo";
import { LobbyInfo } from "../../model/api/LobbyInfo";
import { PlayerInfo } from "../../model/api/PlayerInfo";
import { Global } from "../dataAccessors/GlobalInfo";
import { HomePresenter } from "./HomePresenter";

export class BrowserPresenter {
  public static currentLobbies: LobbyInfo[] = [];
  public static currentLobby: LobbyInfo = { id: -2, name: "", players: [], player_host_id: 0 };
  public static updateLobbies: (lobbies: LobbyInfo[]) => void = (lobbies: LobbyInfo[]) => {
    BrowserPresenter.currentLobbies = lobbies;
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
        msg: { type: "ClientBrowserMessage", msg: { type: "ClientCreateLobby", clientInfo: Global.playerInfo } },
      });
    } else {
      HomePresenter.showMessage("Connection error.", "bad");
    }
  }
  public static attemptJoinLobby(lobbyId: number) {
    if (Global.serverInfo.serverTalker) {
      Global.serverInfo.serverTalker.sendMessage({
        clientId: Global.playerInfo.id,
        msg: {
          type: "ClientBrowserMessage",
          msg: { type: "ClientEnterLobby", clientInfo: Global.playerInfo, lobbyId },
        },
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
    let lobbyIndex: number = BrowserPresenter.currentLobbies.findIndex((lobby) => lobby.id == lobbyInfo.id);
    if (lobbyIndex == -1) {
      BrowserPresenter.currentLobbies.push(lobbyInfo);
    } else {
      BrowserPresenter.currentLobbies[lobbyIndex] = lobbyInfo;
    }
    HomePresenter.changeHomeScreen("lobby");
  }
  public static attemptStartGame() {
    HomePresenter.showMessage("Games have not been implemented yet.", "neutral");
    // if (Global.serverInfo.serverTalker) {
    //   Global.serverInfo.serverTalker.sendMessage({
    //     clientId: Global.playerInfo.id,
    //     msg: {
    //       type: "ClientBrowserMessage",
    //       msg: { type: "ClientStartGame", lobbyId: BrowserPresenter.currentLobby.id, playerId: Global.playerInfo.id },
    //     },
    //   });
    // } else {
    //   HomePresenter.showMessage("Connection error.", "bad");
    // }
  }
}
