import { Vector } from "../misc/2D/Vector";
import { Updateable } from "../misc/Looper/Updateable";
import { PlayerPaddleHandler } from "./PlayerPaddleHandler";
import { PLAYER_CONFIG } from "./PlayerConfig";

export type PlayerAction = "rotateCounterClockwise" | "rotateClockwise";

export abstract class Player implements Updateable {
  public readonly momentum: Vector = { x: -3, y: 0 };
  public readonly balloons: boolean[][] = [];
  public readonly paddlehandler: PlayerPaddleHandler;

  public actionsNextFrame: Record<PlayerAction, boolean> = {
    rotateClockwise: false,
    rotateCounterClockwise: false,
  };

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly color: string,
    public readonly position: Vector,
    rotation: number
  ) {
    this.paddlehandler = new PlayerPaddleHandler(this, rotation);

    for (let i: number = 0; i < PLAYER_CONFIG.balloonLayers.length; i++) {
      this.balloons.push([]);
      for (let j: number = 0; j < PLAYER_CONFIG.balloonLayers[i]; j++) {
        this.balloons[i].push(true);
      }
    }
  }

  public update(elapsedTime: number) {
    this.position.x += this.momentum.x * elapsedTime;
    this.position.y += this.momentum.y * elapsedTime;

    this.paddlehandler.update(elapsedTime);
  }
}

export interface PlayerController {
  readonly player: Player;
  oninput: (input: any) => void;
}
