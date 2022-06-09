import { ServerBrowserMessage } from "../../model/api/messages";
import { Global } from "../dataAccessors/GlobalInfo";
import { BrowserPresenter } from "../presenter/BrowserPresenter";
import { HomePresenter } from "../presenter/HomePresenter";
import { MessageHandlerClass } from "./MessageHandlerClass";

export class BrowserMessageHandler extends MessageHandlerClass {
    constructor() {
        super("ServerBrowserMessage");
    }
    protected receiveMessageSpecific(data: ServerBrowserMessage) {
        switch (data.msg.type) {
            case "ServerLobbiesResponse":
                Global.playerInfo.id = data.msg.clientId;
                BrowserPresenter.updateLobbies(data.msg.lobbies);
                break;
            case "ServerEnterLobbyResponse":
                BrowserPresenter.joinLobby(data.msg.lobby);
                break;
            case "ServerGameStart":
                HomePresenter.startGame(data.msg.gameInfo);
                break;
            default:
                throw new Error("unknown client message type: " + data);
        }
    }
}
