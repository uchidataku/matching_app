import client from "./client";
import { SignInData, SignUpParams } from "../../interfaces/account";

export const signUp = (data: SignUpParams) => {
    return client.post('sign_up', data)
}

export const signIn = (data: SignInData) => {
    return client.post('sign_in', data)
}

