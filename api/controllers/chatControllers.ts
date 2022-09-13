import { chatDao } from '../models/daos'

export const addMessage = async(messageInfo: any) => {
    await chatDao.addMessage(messageInfo)
}

export const getAllMessages = async() => {
    const chatsToRender = await chatDao.getAllMessages()
   return(chatsToRender)
}