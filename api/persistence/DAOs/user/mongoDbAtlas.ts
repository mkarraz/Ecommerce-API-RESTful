import { Request, Response, NextFunction } from 'express'
import cartSchema from '../../../models/schemas/cartSchema'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import userSchema from '../../../models/schemas/userSchema'
import passport from 'passport'
import IUserDAO from './IUserDAO'
import mongoose, { Aggregate } from 'mongoose'
import CartDTO from '../../DTOs/cartDTO'
import { SupportingDocumentContext } from 'twilio/lib/rest/trusthub/v1/supportingDocument'
import productsRouter from '../../../routes/productsRouter'
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
        //const cart = new this.model({user: {id: user.id, username: user.email}, products: []})
        
        //const data = await cart.save()
        //return new this.DTO(data).toJson()
    }


}

export default UserDAOMongoDB.getInstance(userSchema, UserDTO)
