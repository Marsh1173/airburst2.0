import { getNextId } from "../misc/getNextId";
import { Updateable } from "../misc/Looper/Updateable";
import { Ball } from "./Ball";
import { Player } from "./Player";

export abstract class Game implements Updateable {
  public readonly id: number = getNextId();
  public abstract readonly players: Map<number, Player>;
  public abstract readonly balls: Map<number, Ball>;

  constructor(protected readonly mapSize: number) {}

  public update(elapsedTime: number) {
    this.players.forEach((player) => {
      player.update(elapsedTime);
    });
    this.balls.forEach((ball) => {
      ball.update(elapsedTime);
    });
  }
}
