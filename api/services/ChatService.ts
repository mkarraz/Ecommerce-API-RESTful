import m from "../persistence/factory"
import Logger from "../utils/logger"
Logger
const model = m("chat")

class ChatService {

    model: any

    constructor(model: any) {
        this.model = model
    }

    async getMessages() {
        try {
            const data = await this.model.getMessages()
            return data
        } catch (err) {
            Logger.error(`Error in getMessages method: ${err}`)
        }
    }

    async addMessage(newMessage: any) {
        try {
            await this.model.addMessage(newMessage)
        } catch (err) {
            Logger.error(`Error in getMessages method: ${err}`)
        }
    }

}

export default new ChatService(model)