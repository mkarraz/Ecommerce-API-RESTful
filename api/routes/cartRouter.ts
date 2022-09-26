import { Router } from 'express'
import { cartController } from '../controllers/indexController'

const cartRouter = Router()

cartRouter
    .route('/')
    .post(cartController.cartCreate)
    .get(cartController.getProductsByCartId)

cartRouter
    .route('/delete')
    .post(cartController.deleteCartProducts)

cartRouter
    .route('/addProduct')
    .post(cartController.addToCartById)

cartRouter
    .route('/deleteProduct')
    .post(cartController.deleteProductByCartId)

cartRouter
    .route('/order')
    .post(cartController.cartOrder)

export default cartRouter