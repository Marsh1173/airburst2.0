import { Player } from "../../model/game/Player";
import { PLAYER_CONFIG } from "../../model/game/PlayerConfig";
import { Vector } from "../../model/misc/2D/Vector";
import { PlayerDiskCanvasCache } from "../dataAccessors/PlayerDiskCanvasCache";

export class ClientPlayer extends Player {
  constructor(id: number, name: string, color: string, position: Vector, rotation: number) {
    super(id, name, color, position, rotation);
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);

    for (let i: number = 0; i < this.balloons.length; i++) {
      let balloonCanvas: HTMLCanvasElement = PlayerDiskCanvasCache.getBalloonCanvas(this.color, i);
      for (let j: number = 0; j < this.balloons[i].length; j++) {
        if (this.balloons[i][j]) {
          ctx.drawImage(balloonCanvas, -PLAYER_CONFIG.shadowBlur, -PLAYER_CONFIG.shadowBlur);
        }
        ctx.rotate((Math.PI * 2) / this.balloons[i].length);
      }
    }

    let centerCanvas: HTMLCanvasElement = PlayerDiskCanvasCache.getCenterCanvas();
    ctx.drawImage(centerCanvas, -PLAYER_CONFIG.centerRadius, -PLAYER_CONFIG.centerRadius);

    let paddleCanvas: HTMLCanvasElement = PlayerDiskCanvasCache.getPaddleCanvas();
    ctx.rotate(-PLAYER_CONFIG.paddleRadianLength / 2 + this.paddlehandler.rotation);
    ctx.drawImage(paddleCanvas, -PLAYER_CONFIG.paddleThickness / 2, -PLAYER_CONFIG.paddleThickness / 2);
    ctx.rotate(PLAYER_CONFIG.paddleRadianLength / 2 - this.paddlehandler.rotation);

    ctx.translate(-this.position.x, -this.position.y);
  }
}
