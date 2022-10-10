import { Request, Response, NextFunction } from 'express'
import cartSchema from '../../../models/schemas/cartSchema'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import userSchema from '../../../models/schemas/userSchema'
import ICartDAO from './ICartDAO'
import mongoose from 'mongoose'
import CartDTO from '../../DTOs/cartDTO'

class CartsDAOMongoDB extends ICartDAO {
  
  model: mongoose.Model<any, {}, {}, {}>
  DTO: any
  static instance: CartsDAOMongoDB
  
  constructor(cartModel: mongoose.Model<any, {}, {}, {}>, DTO: any) {
    super()
    this.model = cartModel
    this.DTO = DTO
    mongoConnection()
  }

  public async createNewCart(user: any) {
      //const cart = new this.model({user: user.id, products: []})
      const cart = new this.model({user: {id: user.id, username: user.email}, products: []})
      await cart.save()
  }

  public async cartProdDeleteById(user: any): Promise<any | any> {
    const cart: any = await this.model.findOne({ user: user.id })

    if (cart === null) {
      return { error: 'Cart not found in cartProdDeleteById method' }
    } else {
        const cartProductsDelete = await this.model.updateOne(
        { _id: cart._id },
        {
          $set: {
            products: 
              []
          }
        }
      )
      if (cartProductsDelete.modifiedCount === 0) {
        Logger.error('Products not deleted from cart')
      } else {
        Logger.info('Products deleted from cart')
      }
    }
  }

  public async addToCartById(user: any, newProduct: any) {

    const cart: any = await this.model.findOne({ user: user._id })

    if (cart === null) {
      Logger.error(`Cart not found in addToCartById method.`)
    } else {
      const newCartProduct = await this.model.updateOne(
        { _id: cart._id },
        {
          $push: {
            products:
              newProduct
          }
        }
      )
      if (newCartProduct.modifiedCount === 0) {
        Logger.error('Product not added to cart.')
      } else {
        Logger.info('Product succesfully added to cart!')
        return cart
      }
    }
  }

  public async getProductsByCartId(user: any) {

    const cart: any = await this.model.findOne({ user: user.id })
    if (cart === null) {
      return { error: 'Cart not found' }
    } else {
      const data: any = new this.DTO(cart).toJson()
      //Arreglar
      //const data: any = new this.DTO(cart).getProducts()
      return data
    }
  }

  public async deleteProductByCartId(user: any, product: any): Promise<any | any> {
    Logger.info(`prod: ${product}`)
    const cart: any = await this.model.findOne({ user: user.id })
    Logger.info(`cart: ${cart}`)

    if (cart === null) {
      return { error: 'Cart not found' }
    } else {
      const deleteCartProduct = await this.model.updateOne(
        { _id: cart._id },
        {
          $pull: {
            products: {
              id: product.id
            }
          }
        })
      if (deleteCartProduct.modifiedCount === 0) {
        Logger.error('Product not deleted from cart')
      } else {
        Logger.info('Product succesfully deleted from cart!')
      }
    }
  }
}

export default new CartsDAOMongoDB(cartSchema, CartDTO)
