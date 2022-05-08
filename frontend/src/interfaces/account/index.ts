export interface SignUpData {
    account: {
        username: string
        email: string
        password: string
        passwordConfirmation: string
        gender: string
        prefecture: string
        birthday: String | number | Date
        avatar: string
    }
}

export interface SignUpFormData extends FormData {
    append(name: keyof SignUpData, value: String | Blob, fileName?: string): any
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

export interface UpdateAccountFormData extends FormData {
    append(name: keyof UpdateAccountData, value: String | Blob, fileName?: string): any
}