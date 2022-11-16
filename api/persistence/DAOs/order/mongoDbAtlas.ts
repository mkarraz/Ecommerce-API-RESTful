import orderSchema from '../../../models/schemas/orderSchema'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/mongoConnection'
import Logger from '../../../utils/logger'
import OrderDTO from '../../DTOs/OrderDTO'
import IOrderDAO from './IOrderDAO'
import MailSender from '../../../utils/nodeMailer'
import MessageService from '../../../utils/messagings'
import cartSchema from '../../../models/schemas/cartSchema'
import CartDTO from '../../mongoDB/CartDTO'


class OrderDAOMongoDB extends IOrderDAO {

    orderModel: mongoose.Model<any, {}, {}, {}>
    cartModel: mongoose.Model<any, {}, {}, {}>
    OrderDTO: any
    CartDTO: any
    static instance: OrderDAOMongoDB

    constructor(orderModel: mongoose.Model<any, {}, {}, {}>, cartModel: mongoose.Model<any, {}, {}, {}>, OrderDTO: any, CartDTO: any) {
        super()
        this.orderModel = orderModel
        this.cartModel = cartModel
        this.OrderDTO = OrderDTO
        this.CartDTO = CartDTO
        mongoConnection()
    }

    static getInstance(orderSchema: mongoose.Model<any, {}, {}, {}>, OrderDTO: any) {
        if (!this.instance) {
            this.instance = new OrderDAOMongoDB(orderSchema, cartSchema, OrderDTO, CartDTO)
        }
        return this.instance
    }

    public async createOrder(user: any): Promise<any> {

        try {

            const cart = await this.cartModel.findOne({ userId: user._id })

            const cartProducts: any = new this.CartDTO(cart).getProducts()

            if (cartProducts.length == 0) throw new Error('There is not products in the cart.')


            const newOrder = await this.orderModel.create(
                {
                    user: user.email,
                    products: cartProducts.products,
                    status: "generated"
                }
            )

            //eMail to Admin
            await MailSender.newOrder(user, cartProducts.products)
            //SMS to user
            await MessageService.newSMS(user)

            const data = new this.OrderDTO(newOrder).toJson()

            await this.cartModel.updateOne(
                { _id: cart._id },
                {
                    $set: {
                        products:
                            []
                    }
                }
            )

            return data

        } catch (err) {
            Logger.error(`MongoAtlas createOrder method error: ${err}`)
        }
    }

}

export default new OrderDAOMongoDB(orderSchema, cartSchema, OrderDTO, CartDTO)
