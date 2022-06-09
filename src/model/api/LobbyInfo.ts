import { PlayerInfo } from "./PlayerInfo";

export interface LobbyInfo {
  id: number;
  name: string;
  players: PlayerInfo[];
  player_host_id: number;
}
