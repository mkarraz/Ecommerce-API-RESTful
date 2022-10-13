import { Router } from 'express'
import { OrderController } from '../controllers/indexController'

const orderRouter = Router()

orderRouter
    .route('/')
    .post(OrderController.createOrder)

export default orderRouter