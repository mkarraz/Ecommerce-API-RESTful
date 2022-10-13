import cartSchema from '../../../models/schemas/cartSchema'
import orderSchema from '../../../models/schemas/orderSchema'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import OrderDTO from '../../DTOs/orderDTO'

class OrderMongoDAO {

    cartModel: mongoose.Model<any, {}, {}, {}>
    orderModel: mongoose.Model<any, {}, {}, {}>
    DTO: any

    constructor(cart: mongoose.Model<any, {}, {}, {}>, order: mongoose.Model<any, {}, {}, {}>, DTO: any) {
        this.cartModel = cart
        this.orderModel = order
        this.DTO = DTO
        mongoConnection()
    }

    public async createOrder(userId: any): Promise<any[] | any> {
        try {
            const cartProducts = await this.cartModel
                .find({user: userId})
                .lean()
                .populate({path: 'products', select: '_id title description code thumbnail price'}).exec()
            
            if( cartProducts.length == 0 ) throw new Error('There is not products in the cart.')

            const products = cartProducts.map( cartProd => { 
                return {
                    ...cartProd.product, 
                    quantity: cartProd.quantity
                } 
            })

            const newOrder  = await this.orderModel.create(
                { 
                    user: userId, 
                    products: products,
                    number: await this.orderModel.countDocuments({}) 
                }
            )

            await this.cartModel.deleteMany({ user: userId })

            const data: any = new this.DTO(newOrder).toJson()
            return data
        } catch (err) {
            Logger.error(`MongoAtlas getAll method error: ${err}`)
        }
    }

}

export default new OrderMongoDAO(cartSchema, orderSchema, OrderDTO)