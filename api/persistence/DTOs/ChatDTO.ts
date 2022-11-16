class ChatDTO {

    mail: string
    body: string
    timestamp: string

    constructor(chat: any) {
        this.mail = chat.mail
        this.body = chat.body
        this.timestamp = chat.timestamp
    }

    getMessages() {
        const ChatDisplayed = {
            mail: this.mail,
            body: this.body,
            timestamp: this.timestamp,
        }
        return ChatDisplayed
    }
}

export default ChatDTO

