import client from "./client";
import {CreateMessageData} from "../../interfaces/message";

const token = localStorage.getItem("APP_AUTH_TOKEN");

export const createMessage = (room_id: string, data: CreateMessageData) => {
    return client.post(`rooms/${room_id}/messages`, data, { headers: { 'Authorization': `Bearer ${token}` } })
}
