import client from "./client";
import { SignInData, SignUpData } from "../../interfaces";

export const signUp = (data: SignUpData) => {
    return client.post('sign_up', data)
}

export const signIn = (data: SignInData) => {
    return client.post('sign_in', data)
}

