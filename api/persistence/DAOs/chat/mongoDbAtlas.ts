import chatSchema from '../../../models/schemas/chatSchema'
import mongoConnection from '../../mongoDB/mongoConnection'
import IChatDAO from './IChatDAO'
import mongoose from 'mongoose'
import ChatDTO from '../../DTOs/ChatDTO'

class ChatsDAOMongoDB extends IChatDAO {

  chatModel: mongoose.Model<any, {}, {}, {}>
  ChatDTO: any
  UserDTO: any
  static instance: ChatsDAOMongoDB

  constructor(chatModel: mongoose.Model<any, {}, {}, {}>, ChatDTO: any) {
    super()
    this.chatModel = chatModel
    this.ChatDTO = ChatDTO
    mongoConnection()
  }

  static getInstance(chatSchema: mongoose.Model<any, {}, {}, {}>, ChatDTO: any) {
    if (!this.instance) {
      this.instance = new ChatsDAOMongoDB(chatSchema, ChatDTO)
    }
    return this.instance
  }

  public async addMessage(newMessage: any) {

    const dataInput = new this.chatModel(newMessage)
    await dataInput.save()

  }

  public async getMessages() {

    const foundChat = await this.chatModel.find()

    if (foundChat === null) throw new Error(`Your chat is empty.`)

    const data: any = foundChat.map(entity => new this.ChatDTO(entity).getMessages())

    return data
  }
}

export default ChatsDAOMongoDB.getInstance(chatSchema, ChatDTO)
