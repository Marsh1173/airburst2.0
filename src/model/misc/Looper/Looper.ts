import { Updateable } from "./Updateable";

export class Looper {
    private static updateables: Map<number, Updateable> = new Map<number, Updateable>();
    private static update(elapsedTime: number) {
        Looper.updateables.forEach((updateable) => {
            updateable.update(elapsedTime);
        });
    }

    private static going: boolean;
    private static start() {
        Looper.going = true;
        window.requestAnimationFrame((timestamp) => Looper.loop(timestamp));
    }
    private static stop() {
        Looper.going = false;
    }

    public static addUpdateable(updateable: Updateable) {
        Looper.updateables.set(updateable.id, updateable);
        if (!Looper.going) {
            Looper.start();
        }
    }
    public static removeUpdateable(id: number) {
        Looper.updateables.delete(id);
        if (Looper.going && Looper.updateables.size == 0) {
            Looper.stop();
        }
    }

    private static lastFrame: number = 0;
    private static loop(timestamp: number) {
        let elapsedTime = (timestamp - Looper.lastFrame) / 1000;
        if (elapsedTime > 0.1) {
            elapsedTime = 1 / 60;
        }
        Looper.lastFrame = timestamp;
        Looper.update(elapsedTime);
        if (Looper.going) {
            window.requestAnimationFrame((timestamp) => Looper.loop(timestamp));
        }
    }
}
