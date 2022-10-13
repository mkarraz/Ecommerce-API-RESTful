import { Router } from 'express'
import { ProductController } from '../controllers/indexController'

const productsRouter = Router()

productsRouter
    .route('/')
    .get(ProductController.getAll)
    .post(ProductController.addProduct)

productsRouter
    .route('/:id')
    .get(ProductController.getById)
    .put(ProductController.updateProductById)
    .delete(ProductController.deleteProductById)

export default productsRouter