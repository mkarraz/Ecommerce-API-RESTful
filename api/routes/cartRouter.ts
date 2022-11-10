import { Router } from 'express'
import { CartController } from '../controllers/indexController'

const cartRouter = Router()

cartRouter
    .route('/')
    .post(CartController.cartCreate)
    .get(CartController.getProductsByCartId)
    .delete(CartController.deleteCartProducts)

cartRouter
    .route('/addProduct/:productId')
    .post(CartController.addToCartById)

cartRouter
    .route('/:productId')
    .delete(CartController.deleteProductByCartId)

export default cartRouter