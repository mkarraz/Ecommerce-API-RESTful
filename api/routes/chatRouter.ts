import { Router } from 'express'
import { ChatController } from '../controllers/indexController'

const chatRouter = Router()

chatRouter
    .route('/')
    .get(ChatController.renderChatForm)

export default chatRouter