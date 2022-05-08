import client from "./client";
import {UpdateAccountFormData} from "../../interfaces/account";

const token = localStorage.getItem("APP_AUTH_TOKEN");

export const getAccounts = () => {
    return client.get('accounts', { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getAccount = (id: string) => {
    return client.get(`accounts/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const updateAccount = (id: string, data: UpdateAccountFormData) => {
    return client.patch(`accounts/${id}`, data, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getCurrentAccount = () => {
    if(!token) return
    return client.get('current_account', { headers: { 'Authorization': `Bearer ${token}` } })
}
