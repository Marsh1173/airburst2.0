import { ClientMessage, ServerMessage } from "../../model/api/messages";
import { HomePresenter } from "../presenter/HomePresenter";

export abstract class MessageHandlerClass {
    constructor(private readonly specificMessageType: string) {}
    public receiveMessage(data: ServerMessage) {
        if (data.type == "ServerErrorMessage") {
            HomePresenter.showMessage(data.msg, "bad");
        } else if (data.type == this.specificMessageType) {
            this.receiveMessageSpecific(data);
        }
    }
    protected abstract receiveMessageSpecific(data: ServerMessage): void;
}
