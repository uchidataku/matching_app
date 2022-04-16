export interface SignUpData {
    account: {
        username: string
        email: string
        password: string
        passwordConfirmation: string
        gender: Gender
        prefecture: string
        introduction: string
    }
}

export interface SignInData {
    account: {
        email: string
        password: string
    }
}

export type Gender = 'male' | 'female'

export interface Account {
    id: string
    email: string
    username: string
    gender: Gender
    birthday: Date
    prefecture: string
    introduction: string
    avatarUrl: string
}

export interface UpdateAccountData {
    account: {
        gender: Gender
        birthday: Date
        prefecture: string
        introduction: string
        avatar: string
    }
}

export interface Room {
    id: string
    otherAccount: Account
    latestMessage: string
}

export interface Message {
    content: string
}

export interface CreateMessageData {
    message: {
        content: string
    }
}