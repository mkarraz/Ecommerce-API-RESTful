import cartSchema from '../../../models/schemas/cartSchema'
import orderSchema from '../../../models/schemas/orderSchema'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import OrderDTO from '../../DTOs/orderDTO'

const ObjectId = mongoose.Types.ObjectId

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

    public async createOrder(user: any): Promise<any[] | any> {

        if(!ObjectId.isValid(user.id)) return undefined

        try {
            const cartProducts = await this.cartModel
                .find({user: user.id})
                .populate({path: 'products', select: '_id title description code thumbnail price'}).exec()
            
            Logger.info(`cartProducts, ${cartProducts}`)

            if( cartProducts.length == 0 ) throw new Error('There is not products in the cart.')

            const products = cartProducts.map( cartProd => { 
                return {
                    ...cartProd.product, 
                    quantity: cartProd.quantity
                } 
            })

            Logger.info(`products, ${products}`)

            const newOrder  = await this.orderModel.create(
                { 
                    user: user.id, 
                    products: products,
                    number: await this.orderModel.countDocuments({}) 
                }
            )

            Logger.info(`newOrder, ${newOrder}`)

            //await this.cartModel.deleteMany({ user: user.id })

            const data: any = new this.DTO(newOrder).toJson()

            Logger.info(`data, ${data}`)
            return data
        } catch (err) {
            Logger.error(`MongoAtlas getAll method error: ${err}`)
        }
    }

}

export default new OrderMongoDAO(cartSchema, orderSchema, OrderDTO)
