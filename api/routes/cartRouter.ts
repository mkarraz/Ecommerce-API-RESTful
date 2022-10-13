import { Router } from 'express'
import { CartController } from '../controllers/indexController'

const cartRouter = Router()

cartRouter
    .route('/')
    .post(CartController.cartCreate)
    .get(CartController.getProductsByCartId)

cartRouter
    .route('/delete')
    .post(CartController.deleteCartProducts)

cartRouter
    .route('/addProduct')
    .post(CartController.addToCartById)

cartRouter
    .route('/deleteProduct')
    .post(CartController.deleteProductByCartId)

export default cartRouter