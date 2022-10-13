import { Request, Response } from 'express'
import ProductService from '../services/ProductService'
import Logger from '../utils/logger'

class ProductController {
    constructor() { }

    async getAll(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Getting all products from DB`)
        try {
            const products = await ProductService.getAllProducts()
            return res.status(200).json({ products: products })
        } catch (err) {
            Logger.error(`Error in getAll method: ${err}`)
            return res.status(500).json({ error: 'An error has occurred.' })
        }
    }

    async getById(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Getting product by id from DB`)
        try {
            const { id } = req.params
            const product = await ProductService.getProductById(id)
            if (product === undefined || product === null) return res.status(404).json({ error: 'Cannot find requested product' })
            return res.status(200).json({ product: product })
        } catch (err) {
            Logger.error(`Error in getById method: ${err}`)
            return res.status(500).json({ error: 'An error has occurred.' })
        }
    }

    async addProduct(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Adding new product to DB`)
        try {
            const productInputs = req.body

            const product = await ProductService.addProduct(productInputs)
            return res.status(200).json({ ProductAdded: product })

        } catch (err) {
            Logger.error(`Error in addProduct method: ${err}`)
            return res.status(500).json({ error: 'An error has occurred.' })
        }
    }

    async updateProductById(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Updating product at DB`)
        try {
            const { id } = req.params
            const newData = req.body

            const productUpdated = await ProductService.updateProductById(id, newData)

            if (productUpdated === undefined || productUpdated === null) return res.status(404).json({ error: 'Cannot find requested product' })

            return res.status(200).json({ ProductUpdated: productUpdated })

        } catch (err) {
            Logger.error(`Error in updateProductById method: ${err}`)
            return res.status(500).json({ error: 'An error has occurred.' })
        }
    }

    async deleteProductById(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting product by id from DB`)
        try {
            const { id } = req.params
            const deletedProduct = await ProductService.deleteProductById(id)

            if (deletedProduct === undefined || deletedProduct === null) return res.status(404).json({ error: 'Cannot find requested product' })

            return res.status(200).json({ ProductDeleted: deletedProduct })
        } catch (err) {
            Logger.error(`Error in deleteProductById method: ${err}`)
        }
    }

}

export default new ProductController()