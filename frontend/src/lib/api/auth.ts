import client from "./client";
import {SignInData, SignUpFormData} from "../../interfaces/account";

export const signUp = (data: SignUpFormData) => {
    return client.post('sign_up', data)
}

export const signIn = (data: SignInData) => {
    return client.post('sign_in', data)
}

