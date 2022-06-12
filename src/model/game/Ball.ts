import { Vector } from "../misc/2D/Vector";
import { Updateable } from "../misc/Looper/Updateable";

export abstract class Ball implements Updateable {
  constructor(public readonly id: number, public readonly momentum: Vector, public readonly position: Vector) {}

  public update(elapsedTime: number) {
    this.position.x += this.momentum.x * elapsedTime;
    this.position.y += this.momentum.y * elapsedTime;
  }
}
