export interface Message {
    content: string
    accountId: string
    createdAt?: Date
}

export interface CreateMessageData {
    message: {
        content: string
    }
}