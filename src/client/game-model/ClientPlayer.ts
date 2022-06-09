import { Player } from "../../model/game/Player";
import { Vector } from "../../model/misc/2D/Vector";

export class ClientPlayer extends Player {
  constructor(id: number, name: string, position: Vector, rotation: number) {
    super(id, name, position, rotation);
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";

    ctx.fillRect(this.position.x - 5, this.position.y - 5, 10, 10);
  }
}
