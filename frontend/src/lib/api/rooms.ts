import client from "./client";

const token = localStorage.getItem("APP_AUTH_TOKEN");

export const getRooms = () => {
    return client.get('rooms', { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getRoom = (id: string) => {
    return client.get(`rooms/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
