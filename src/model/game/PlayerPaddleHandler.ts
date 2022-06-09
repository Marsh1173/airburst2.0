import { Updateable } from "../misc/Looper/Updateable";
import { getNextId } from "../misc/getNextId";
import { Player } from "./Player";
import { PLAYER_CONFIG } from "./PlayerConfig";

export class PlayerPaddleHandler implements Updateable {
  public readonly id: number = getNextId();
  constructor(private readonly player: Player, public rotation: number) {}
  public update(elapsedTime: number) {
    if (this.player.actionsNextFrame.rotateClockwise && this.player.actionsNextFrame.rotateCounterClockwise) {
      this.rotation += elapsedTime * PLAYER_CONFIG.rotateSpeed;
    } else if (!this.player.actionsNextFrame.rotateClockwise && !this.player.actionsNextFrame.rotateCounterClockwise) {
      this.rotation -= elapsedTime * PLAYER_CONFIG.rotateSpeed;
    }
  }
}
