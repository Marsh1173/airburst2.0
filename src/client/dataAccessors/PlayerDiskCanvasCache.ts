import { PLAYER_CONFIG } from "../../model/game/PlayerConfig";

export class PlayerDiskCanvasCache {
  private static balloonCanvasCache: Map<string, HTMLCanvasElement[]> = new Map<string, HTMLCanvasElement[]>();
  private static centerCanvasCache: HTMLCanvasElement | undefined = undefined;
  private static paddleCanvasCache: HTMLCanvasElement | undefined = undefined;

  public static clearCaches() {
    PlayerDiskCanvasCache.balloonCanvasCache.clear();
  }

  public static getBalloonCanvas(color: string, layer: number): HTMLCanvasElement {
    if (!PlayerDiskCanvasCache.balloonCanvasCache.has(color)) {
      PlayerDiskCanvasCache.balloonCanvasCache.set(color, []);
    }
    let balloonCanvasArray: HTMLCanvasElement[] = PlayerDiskCanvasCache.balloonCanvasCache.get(color)!;

    if (layer >= balloonCanvasArray.length) {
      for (let i: number = balloonCanvasArray.length; i <= layer; i++) {
        balloonCanvasArray.push(PlayerDiskCanvasCache.drawBalloon(color, i));
      }
      PlayerDiskCanvasCache.balloonCanvasCache.set(color, balloonCanvasArray);
    }

    return balloonCanvasArray[layer];
  }

  private static drawBalloon(color: string, layer: number): HTMLCanvasElement {
    let canvas: HTMLCanvasElement = document.createElement("canvas");
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    let radius: number =
      PLAYER_CONFIG.centerRadius +
      (layer + 1) * PLAYER_CONFIG.balloonGapSize +
      (layer + 0.5) * PLAYER_CONFIG.balloonLayerSize;
    let spacing: number = 1 / ((layer + 1) * 50);

    canvas.width =
      PLAYER_CONFIG.centerRadius +
      (layer + 1) * PLAYER_CONFIG.balloonGapSize +
      (layer + 1) * PLAYER_CONFIG.balloonLayerSize +
      PLAYER_CONFIG.shadowBlur * 2;
    canvas.height =
      PLAYER_CONFIG.centerRadius +
      (layer + 1) * PLAYER_CONFIG.balloonGapSize +
      (layer + 1) * PLAYER_CONFIG.balloonLayerSize +
      PLAYER_CONFIG.shadowBlur * 2;

    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = PLAYER_CONFIG.shadowBlur;
    ctx.lineWidth = PLAYER_CONFIG.balloonLayerSize;

    ctx.beginPath();
    ctx.arc(
      PLAYER_CONFIG.shadowBlur,
      PLAYER_CONFIG.shadowBlur,
      radius,
      spacing,
      (Math.PI * 2) / PLAYER_CONFIG.balloonLayers[layer] - spacing
    );
    ctx.stroke();

    return canvas;
  }

  public static getCenterCanvas(): HTMLCanvasElement {
    if (!PlayerDiskCanvasCache.centerCanvasCache) {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

      canvas.width = PLAYER_CONFIG.centerRadius * 2;
      canvas.height = PLAYER_CONFIG.centerRadius * 2;

      ctx.strokeStyle = "#03f8fc";
      ctx.lineWidth = PLAYER_CONFIG.centerThickness;

      ctx.beginPath();
      ctx.arc(
        PLAYER_CONFIG.centerRadius,
        PLAYER_CONFIG.centerRadius,
        PLAYER_CONFIG.centerRadius - PLAYER_CONFIG.centerThickness / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      PlayerDiskCanvasCache.centerCanvasCache = canvas;
    }

    return PlayerDiskCanvasCache.centerCanvasCache;
  }

  public static getPaddleCanvas(): HTMLCanvasElement {
    if (!PlayerDiskCanvasCache.paddleCanvasCache) {
      let canvas: HTMLCanvasElement = document.createElement("canvas");
      let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

      let radius =
        PLAYER_CONFIG.centerRadius +
        (PLAYER_CONFIG.balloonLayers.length + 1) * (PLAYER_CONFIG.balloonGapSize + PLAYER_CONFIG.balloonLayerSize);

      canvas.width = radius + PLAYER_CONFIG.paddleThickness;
      canvas.height = radius + PLAYER_CONFIG.paddleThickness;

      ctx.strokeStyle = "#03f8fc";
      ctx.lineWidth = PLAYER_CONFIG.paddleThickness;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.arc(
        PLAYER_CONFIG.paddleThickness / 2,
        PLAYER_CONFIG.paddleThickness / 2,
        radius,
        0,
        PLAYER_CONFIG.paddleRadianLength
      );
      ctx.stroke();

      PlayerDiskCanvasCache.paddleCanvasCache = canvas;
    }

    return PlayerDiskCanvasCache.paddleCanvasCache;
  }
}
