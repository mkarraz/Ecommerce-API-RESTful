import { Request, Response, NextFunction } from 'express'
import MongoDBContainer from '../../containers/mongoDBContainer'
import cartSchema from '../../schemas/cartSchema'
import Logger from '../../../utils/logger'
import userSchema from '../../schemas/userSchema'

class CartsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super(cartSchema)
  }

  public async createNewCart(user: any) {
      const cart = new this.model({user: user.id, products: []})
      await cart.save()
  }

  public async cartProdDeleteById(user: any) {
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
      const foundItemsInCart = cart.products
      Logger.info(`Cart: ${foundItemsInCart}`)
      return foundItemsInCart
    }
  }

  public async deleteProductByCartId(user: any, product: any) {
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

export default new CartsDAOMongoDB()
