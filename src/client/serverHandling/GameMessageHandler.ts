import { ServerGameMessage } from "../../server/ServerGame/ServerGame";
import { Global } from "../dataAccessors/GlobalInfo";
import { ClientGame } from "../game-model/ClientGame";
import { BrowserPresenter } from "../presenter/BrowserPresenter";
import { MessageHandlerClass } from "./MessageHandlerClass";

export class GameMessageHandler extends MessageHandlerClass {
  constructor(game: ClientGame) {
    super("ServerGameMessage");
  }
  protected receiveMessageSpecific(data: ServerGameMessage) {
    console.log(data);
    // switch (data.msg.type) {
    //     case "ServerLobbiesResponse":
    //         Global.playerInfo.id = data.msg.clientId;
    //         BrowserPresenter.updateLobbies(data.msg.lobbies);
    //         break;
    //     case "ServerEnterLobbyResponse":
    //         BrowserPresenter.joinLobby(data.msg.lobby);
    //         break;
    //     default:
    //         throw new Error("unknown client message type: " + data);
    // }
  }
}
