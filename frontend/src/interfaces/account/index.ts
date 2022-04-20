export interface SignUpParams {
    account: {
        username: string
        email: string
        password: string
        passwordConfirmation: string
        gender: number
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

// export type Gender = 'male' | 'female'
//
// export const genderLabelFor = (gender: Gender): string => {
//     switch(gender) {
//         case "male":
//             return "男性";
//         case "female":
//             return "女性";
//     }
// }

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