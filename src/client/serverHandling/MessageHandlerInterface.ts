import { ClientMessage } from "../../model/api/messages";

export interface MessageHandlerInterface {
    receiveMessage: (data: ClientMessage) => void;
}
