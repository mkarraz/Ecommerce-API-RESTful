import { Router } from 'express'
import { ProductController } from '../controllers/indexController'

const productsRouter = Router()

productsRouter
    .route('/')
    .get(ProductController.getAll)
    .post(ProductController.addProduct)

productsRouter
    .route('/id/:id')
    .get(ProductController.getById)
    .put(ProductController.updateProductById)
    .delete(ProductController.deleteProductById)

productsRouter
    .route('/categories/:category')
    .get(ProductController.getByCategory)

export default productsRouter