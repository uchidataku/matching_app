export interface Like {
    id?: string
    fromAccountId: string | undefined | null
    toAccountId: string | undefined | null
}

export interface CreateLikeData {
    like: {
        toAccountId: string
    }
}