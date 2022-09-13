import { Request, Response } from 'express'
import FakerProducts from '../models/FakerProductsContainer'
import Logger from '../utils/logger'

export const getFakerProducts = async (req: Request, res: Response) => {
    try {
        const fakerProducts = new FakerProducts()
        const result = await fakerProducts.listFakerProducts()
        Logger.info('Result', result)
        return res.json(result)
    } catch (err) {
        Logger.error(`Han error has ocurred; ${err}`)
    }
}
