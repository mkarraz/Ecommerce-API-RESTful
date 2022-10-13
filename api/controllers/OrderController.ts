import { Request, Response } from 'express'
import OrderService from "../services/OrderService"
import Logger from '../utils/logger'

class OrderController {

    constructor() { }

    async createOrder(req: Request, res: Response) {
        try {
            const user = req.user
            const order = await OrderService.getProductsByCartId(user)
            
            res.redirect('/')
        } catch (err) {
            Logger.error(`Error in getProductsByCartId method, Order Controller: ${err}`)
        }
    }
}

export default new OrderController