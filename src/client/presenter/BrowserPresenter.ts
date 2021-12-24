import { LobbyInfo } from "../../model/api/LobbyInfo";

export class BrowserPresenter {
    public static currentLobbies: LobbyInfo[] = [];
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
}
