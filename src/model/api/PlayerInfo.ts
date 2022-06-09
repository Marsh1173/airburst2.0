import { Vector } from "../misc/2D/Vector";

export interface PlayerInfo {
  id: number;
  name: string;
  color: string;
}

export interface GamePlayerInfo extends PlayerInfo {
  pos: Vector;
  rotation: number;
}
