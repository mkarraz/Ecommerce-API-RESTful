import { Router } from 'express'
import { productsController } from '../controllers/indexController'

const productsRouter = Router()

productsRouter
    .route('/')
    .get(productsController.getAll)
    .post(productsController.addProduct)

productsRouter
    .route('/:id')
    .get(productsController.getById)
    .put(productsController.updateProductById)
    .delete(productsController.deleteProductById)

export default productsRouter