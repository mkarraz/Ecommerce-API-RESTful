import { Request, Response } from 'express'
import ProductService from '../services/productService'
import Logger from '../utils/logger'

const getAll = async(req: Request, res: Response) => {
    Logger.info(`${req.method} request to '${req.originalUrl}' route: Getting all products from DB`)
    try {
        const products = await ProductService.getAllProducts()
        return products
    } catch (err) {
        Logger.error(`Error in getAll method: ${err}`)
    }
}

const getById = async (req: Request, res: Response) => {
    Logger.info(`${req.method} request to '${req.originalUrl}' route: Getting product by id from DB`)
    try {
        const { id } = req.params
        const body = await ProductService.getProductById(id)
        res.json(body)
    } catch (err) {
        Logger.error(`Error in getById method: ${err}`)
    }
}
   
const addProduct = async (req: Request, res: Response) => {
    Logger.info(`${req.method} request to '${req.originalUrl}' route: Adding new product to DB`)
    try {
        const product = req.body
        await ProductService.addProduct(product)
        res.redirect('/')
    } catch (err) {
        Logger.error(`Error in addProduct method: ${err}`)
    }
}

const updateProductById = async (req: Request, res: Response) => {
    Logger.info(`${req.method} request to '${req.originalUrl}' route: Updating product at DB`)
    try {
        const { id } = req.params
        const product = req.body
        await ProductService.updateProductById(id, product)

        res.json({
            msg: `Product ${id} updated.`,
        })
    } catch (err) {
        Logger.error(`Error in updateProductById method: ${err}`)
    }
}

const deleteProductById = async (req: Request, res: Response) => {
    Logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting product by id from DB`)
    try {
        const { id } = req.params
        const deletedProduct = await ProductService.deleteProductById(id)

        res.json({
            deletedProduct
        })
    } catch (err) {
        Logger.error(`Error in deleteProductById method: ${err}`)
    }
}

export const productsController = {
    getAll,
    getById,
    addProduct,
    updateProductById,
    deleteProductById
}