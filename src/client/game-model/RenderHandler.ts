import { ClientGame } from "./ClientGame";

export class RenderHandler {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly game: ClientGame,
    private readonly mapSize: number
  ) {
    this.canvas.height = this.mapSize;
    this.canvas.width = this.mapSize;
    this.ctx = this.canvas.getContext("2d")!;
  }

  public render() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.mapSize, this.mapSize);
    this.game.players.forEach((player) => {
      player.render(this.ctx);
    });
  }
}
