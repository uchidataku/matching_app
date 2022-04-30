import client from "./client";
import {UpdateAccountData} from "../../interfaces/account";

const token = localStorage.getItem("AUTH_TOKEN");

export const getAccounts = () => {
    return client.get('accounts', { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getAccount = (id: string) => {
    return client.get(`accounts/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const updateAccount = (id: string, data: UpdateAccountData) => {
    return client.patch(`accounts/${id}`, data, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getCurrentAccount = () => {
    console.log('===token==')
    console.log(token)
    if(!token) return
    return client.get('current_account', { headers: { 'Authorization': `Bearer ${token}` } })
}
