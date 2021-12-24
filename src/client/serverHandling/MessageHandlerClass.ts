import { ClientMessage, ServerMessage } from "../../model/api/messages";

export abstract class MessageHandlerClass {
    constructor(private readonly specificMessageType: string) {}
    public receiveMessage(data: ServerMessage) {
        if (data.type == "ServerErrorMessage") {
        } else if (data.type == this.specificMessageType) {
            this.receiveMessageSpecific(data);
        }
    }
    protected abstract receiveMessageSpecific(data: ServerMessage): void;
}
