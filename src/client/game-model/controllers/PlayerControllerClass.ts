import { Player, PlayerController } from "../../../model/game/Player";
import { ClientPlayer } from "../ClientPlayer";

export class PlayerControllerClass implements PlayerController {
  constructor(public readonly player: ClientPlayer) {
    window.onkeydown = (e: KeyboardEvent) => {
      this.oninput(e.code);
    };
  }

  public oninput(input: string) {
    console.log(input);
    switch (input) {
      case "KeyA":
        console.log("Pressed A");
        break;
    }
  }
}
