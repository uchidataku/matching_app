import client from "./client";
import {CreateLikeData} from "../../interfaces/like";

const token = localStorage.getItem("APP_AUTH_TOKEN");

export const getLikes = (account_id: string) => {
    return client.get(`accounts/${account_id}/likes`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createLike = (account_id: string, data: CreateLikeData) => {
    return client.post(`accounts/${account_id}/likes`, data, { headers: { 'Authorization': `Bearer ${token}` } })
}