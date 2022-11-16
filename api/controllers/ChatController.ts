import { Request, Response } from 'express'
import Logger from '../utils/logger'

class ChatController {
    constructor() { }

    async renderChatForm(req: Request, res: Response) {
        
        try {
            res.status(200).render('home')
        } catch (err) {
            Logger.error(`Error in renderChatForm method, chatController: ${err}`)
        }
    }
}

export default new ChatController()