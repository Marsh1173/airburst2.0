import { GamePlayerInfo } from "./PlayerInfo";
import { BallInfo } from "./BallInfo";

export interface GameInfo {
    players: GamePlayerInfo[];
    mapSize: number;
    balls: BallInfo[];
    startTime: number;
}
