export interface SignUpData {
    account: {
        username: string
        email: string
        password: string
        passwordConfirmation: string
    }
}

export interface SignInData {
    account: {
        email: string
        password: string
    }
}

export interface Account {
    id: string
    email: string
    username: string
}