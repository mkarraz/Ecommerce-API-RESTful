import mongoConnection from '../../mongoDB/mongoConnection'
import userSchema from '../../../models/schemas/userSchema'
import IUserDAO from './IUserDAO'
import mongoose from 'mongoose'
import UserDTO from '../../DTOs/UserDTO'

class UserDAOMongoDB extends IUserDAO {

  model: mongoose.Model<any, {}, {}, {}>
  DTO: any
  static instance: UserDAOMongoDB

  constructor(userModel: mongoose.Model<any, {}, {}, {}>, DTO: any) {
    super()
    this.model = userModel
    this.DTO = DTO
    mongoConnection()
  }

  static getInstance(userSchema: mongoose.Model<any, {}, {}, {}>, UserDTO: any) {
    if (!this.instance) {
      this.instance = new UserDAOMongoDB(userSchema, UserDTO)
    }
    return this.instance
  }

  public async save(newUser: any) {
    const data = await this.model.create(newUser)
    return data
  }


}

export default UserDAOMongoDB.getInstance(userSchema, UserDTO)
