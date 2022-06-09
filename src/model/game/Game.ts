import { getNextId } from "../misc/getNextId";
import { Updateable } from "../misc/Looper/Updateable";
import { Player } from "./Player";

export abstract class Game implements Updateable {
  public readonly id: number = getNextId();
  public abstract readonly players: Player[];

  constructor(private readonly mapSize: number) {}

  public update(elapsedTime: number) {
    this.players.forEach((player) => {
      player.update(elapsedTime);
    });
  }
}
