import { Global } from "./GlobalInfo";

export class LocalStorageHandler {
    public static initLocalStorage() {
        let name: string | null = localStorage.getItem("name");
        if (name != null) {
            Global.playerInfo.name = name;
        }
    }

    public static setName(name: string) {
        localStorage.setItem("name", name);
    }
}
