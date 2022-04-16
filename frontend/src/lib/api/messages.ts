import client from "./client";
import {CreateMessageData} from "../../interfaces";

const token = localStorage.getItem("AUTH_TOKEN");

export const createMessage = (room_id: string, data: CreateMessageData) => {
    return client.post(`rooms/${room_id}/messages`, { headers: { 'Authorization': `Bearer ${token}` } })
}
