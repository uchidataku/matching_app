export interface SignUpParams {
    account: {
        username: string
        email: string
        password: string
        passwordConfirmation: string
        gender: string
        prefecture: string
        birthday: Date | null
    }
}

export interface SignInData {
    account: {
        email: string
        password: string
    }
}

export type Gender = 'male' | 'female';

export const genderLabelFor = (gender: string): Gender => {
    if(gender === "女性") {
        return "female";
    } else {
        return "male";
    }
}

export interface Account {
    id: string
    email: string
    username: string
    gender: number
    birthday: String | number | Date
    prefecture: string
    introduction: string
    avatarUrl: string
}

export interface UpdateAccountData {
    account: {
        gender: number
        birthday: Date
        prefecture: string
        introduction: string
        avatar: string
    }
}