import cartSchema from '../../../models/schemas/cartSchema'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import ICartDAO from './ICartDAO'
import mongoose from 'mongoose'
import CartDTO from '../../mongoDB/CartDTO'
import ProductService from '../../../services/ProductService'

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

  static getInstance(cartSchema: mongoose.Model<any, {}, {}, {}>, CartDTO: any) {
    if (!this.instance) {
      this.instance = new CartsDAOMongoDB(cartSchema, CartDTO)
    }
    return this.instance
  }

  public async createNewCart(user: any) {
    const cart = new this.model({ userId: user.id, userEmail: user.email, products: [] })
    const data = await cart.save()
    return new this.DTO(data).toJson()
  }

  public async deleteCartProducts(user: any): Promise<any | any> {
    const cart: any = await this.model.findOne({ userId: user.id })

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
        const emptyCart: any = await this.model.findOne({ userId: user._id })
        return new this.DTO(emptyCart).toJson()
      }
    }
  }

  public async addToCartById(user: any, productId: any, quantity: any) {

    const cart: any = await this.model.findOne({ userId: user._id })

    if (cart === null) {
      Logger.error(`Cart not found in addToCartById method.`)
    } else {
      //checks if products already exists in cart
      let prodExistence = await this.model.aggregate([
        { $match: { 'products.productId': productId } },
        {
          $project: {
            count: {
              $size: {//to get total elements in bottom filtered result
                $filter: {//to iterate loop of products array and match productId
                  input: '$products',
                  cond: {
                    $eq: ['$$this.productId', productId]
                  }
                }
              }
            }
          }
        },
        {
          $group: {//get total count
            _id: null,
            count: { $sum: '$count' }
          }
        }
      ])
      if (prodExistence && prodExistence[0]) {

        const newCartProductQty = await this.model.updateOne(
          { _id: cart._id, 'products.productId': productId },
          {
            $inc: { 'products.$.quantity': quantity }
          }
        )

        if (newCartProductQty.modifiedCount === 0) {
          Logger.error('Product quantity could not been modified.')
        } else {
          Logger.info('Product quantity succesfully updated!')
          const updatedCart: any = await this.model.findOne({ userId: user._id })
          return new this.DTO(updatedCart).toJson()
        }


      } else {//product does not exists.
        const { name, price, description, photoURL } = await ProductService.getProductById(productId)

        const newCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $push: {
              products: {
                productId,
                name,
                price,
                description,
                photoURL,
                quantity
              }
            }
          }
        )
        if (newCartProduct.modifiedCount === 0) {
          Logger.error('Product not added to cart.')
        } else {
          Logger.info('Product succesfully added to cart!')
          const updatedCart: any = await this.model.findOne({ userId: user._id })
          return new this.DTO(updatedCart).toJson()
        }
      }
    }
  }

  public async getProductsByCartId(user: any) {

    const cart: any = await this.model.findOne({ userId: user.id })

    if (cart === null) {
      return { error: 'Cart not found' }
    } else {
      const data: any = new this.DTO(cart).getProducts()
      if (data.products.length == 0) return { message: 'There is no products in the cart.' }
      return data
    }
  }

  public async deleteProductByCartId(user: any, productId: any): Promise<any | any> {

    const cart: any = await this.model.findOne({ userId: user.id })
    Logger.info(`cart: ${cart}`)

    if (cart === null) {
      return { error: 'Cart not found' }
    } else {
      const deleteCartProduct = await this.model.updateOne(
        { _id: cart._id },
        {
          $pull: {
            products: {
              productId: productId
            }
          }
        })
      if (deleteCartProduct.modifiedCount === 0) {
        Logger.error('Product not deleted from cart')
      } else {
        Logger.info('Product succesfully deleted from cart!')
        return productId
      }
    }
  }
}

export default CartsDAOMongoDB.getInstance(cartSchema, CartDTO)
