import { LobbyInfo } from "../../model/api/LobbyInfo";
import { getNextId } from "../../model/misc/getNextId";
import { ServerClass } from "../ServerClass";
import { WebSocketClient } from "./WebSocketClient";

export class BrowserHandler {
  public readonly lobbyMap: Map<number, LobbyInfo> = new Map<number, LobbyInfo>();
  public readonly clientMap: Map<number, WebSocketClient> = new Map<number, WebSocketClient>();

  constructor(private readonly server: ServerClass) {}

  public sendLobbyListToClient(client: WebSocketClient) {
    let lobbies: LobbyInfo[] = [];
    this.lobbyMap.forEach((lobby) => {
      lobbies.push(lobby);
    });

    client.send({
      type: "ServerBrowserMessage",
      msg: { type: "ServerLobbiesResponse", clientId: client.playerInfo.id, lobbies },
    });
  }

  public sendLobbyListToAllClients(exceptionId?: number) {
    let lobbies: LobbyInfo[] = [];
    this.lobbyMap.forEach((lobby) => {
      lobbies.push(lobby);
    });

    this.clientMap.forEach((client) => {
      if (!exceptionId || exceptionId != client.playerInfo.id) {
        client.send({
          type: "ServerBrowserMessage",
          msg: { type: "ServerLobbiesResponse", clientId: client.playerInfo.id, lobbies },
        });
      }
    });
  }

  public movePlayerToLobby(client: WebSocketClient, lobbyId: number) {
    let lobby: LobbyInfo | undefined = this.lobbyMap.get(lobbyId);
    if (lobby) {
      lobby.players.push(client.playerInfo);
      client.send({ type: "ServerBrowserMessage", msg: { type: "ServerEnterLobbyResponse", lobby } });
    }
  }

  public createLobby(client: WebSocketClient): number {
    let newId: number = getNextId();
    let lobbyInfo: LobbyInfo = {
      id: newId,
      name: client.playerInfo.name + "'s Game",
      players: [],
      player_host_id: client.playerInfo.id,
    };
    this.lobbyMap.set(newId, lobbyInfo);
    return newId;
  }

  public playerLeaveLobby(client: WebSocketClient, lobbyId: number) {
    let lobby: LobbyInfo | undefined = this.lobbyMap.get(lobbyId);
    if (lobby) {
      lobby.players = lobby.players.filter((player) => player.id != client.playerInfo.id);

      if (lobby.players.length === 0) {
        this.lobbyMap.delete(lobbyId);
      } else if (lobby.player_host_id === client.playerInfo.id) {
        lobby.player_host_id = lobby.players[0].id;
        lobby.name = lobby.players[0].name + "'s Game";
      }

      this.server.browserHandler.sendLobbyListToAllClients();
    }
  }

  public clearPlayerFromLobbies(client: WebSocketClient) {
    this.clientMap.delete(client.playerInfo.id);
    this.lobbyMap.forEach((lobby) => {
      let index: number = lobby.players.findIndex((player) => player.id == client.playerInfo.id);
      if (index != -1) {
        this.playerLeaveLobby(client, lobby.id);
      }
    });
  }

  public startGame(lobbyId: number, playerId: number) {
    let lobby: LobbyInfo | undefined = this.lobbyMap.get(lobbyId);
    /*if (lobby && lobby.players.length <= 1) {
            let client: WebSocketClient | undefined = this.clientMap.get(playerId);
            client?.send({ type: "ServerErrorMessage", msg: "Not enough players." });
        } else */ if (lobby) {
      let clients: WebSocketClient[] = lobby.players.map((playerInfo) => {
        return this.clientMap.get(playerInfo.id)!;
      });

      this.lobbyMap.delete(lobbyId);
      lobby.players.forEach((player) => {
        this.clientMap.delete(player.id);
      });
      this.server.startGame(clients);
    }
  }
}
