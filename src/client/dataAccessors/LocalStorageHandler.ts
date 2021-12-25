import { Global } from "./GlobalInfo";

export class LocalStorageHandler {
    public static initLocalStorage() {
        let name: string | null = localStorage.getItem("name");
        if (name != null) {
            Global.playerInfo.name = name;
        }

        let color: string | null = localStorage.getItem("color");
        if (color != null) {
            Global.playerInfo.color = color;
        }
    }

    public static savePlayerInfo(name: string, color: string) {
        localStorage.setItem("name", name);
        localStorage.setItem("color", color);
    }
}
