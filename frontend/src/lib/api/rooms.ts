import client from "./client";

const token = localStorage.getItem("AUTH_TOKEN");

export const getRooms = () => {
    console.log('====token====')
    console.log(token)
    return client.get('rooms', { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getRoom = (id: string) => {
    return client.get(`rooms/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
