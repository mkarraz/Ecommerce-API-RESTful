import { Request, Response } from 'express'
import OrderService from "../services/OrderService"
import Logger from '../utils/logger'

class OrderController {

    constructor() { }

    async createOrder(req: Request, res: Response) {
        try {
            const user = req.user
            const order = await OrderService.createOrder(user)
            
            return res.status(200).json({ order: order })
            
        } catch (err) {
            Logger.error(`Error in createOrder method, Order Controller: ${err}`)
        }
    }
}

export default new OrderController