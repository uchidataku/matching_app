import {Account} from "../account";

export interface Room {
    id: string
    otherAccount: Account
    latestMessage: string
}