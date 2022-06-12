import { ServerGameMessage } from "../../server/ServerGame/ServerGame";
import { ClientBall } from "../game-model/ClientBall";
import { ClientPlayer } from "../game-model/ClientPlayer";
import { MessageHandlerClass } from "./MessageHandlerClass";

export class GameMessageHandler extends MessageHandlerClass {
  private readonly remotePlayerMap: Map<number, ClientPlayer> = new Map<number, ClientPlayer>();
  private readonly ballMap: Map<number, ClientBall> = new Map<number, ClientBall>();
  private localPlayer: ClientPlayer | undefined = undefined;

  constructor() {
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

  public setRemotePlayerAPI(player: ClientPlayer) {
    this.remotePlayerMap.set(player.id, player);
  }
  public setLocalPlayerAPI(player: ClientPlayer) {
    this.localPlayer = player;
  }
  public setBallAPI(ball: ClientBall) {
    this.ballMap.set(ball.id, ball);
  }
}
