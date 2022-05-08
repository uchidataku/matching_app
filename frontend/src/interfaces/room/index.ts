import {Account} from "../account";
import {Message} from "../message";

export interface Room {
    id: string
    otherAccount: Account
    latestMessage: Message
}