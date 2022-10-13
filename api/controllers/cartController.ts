import { Request, Response } from 'express'
import MailSender from '../utils/nodeMailer'
import Logger from '../utils/logger'
import MessageService from '../utils/messagings'
import CartService from '../services/CartService'

class CartController {

    constructor() { }

    //Executed with hook post, when new user is registered
    async cartCreate(res: Response, user: any) {
        try {
            await CartService.createNewCart(user)
            Logger.info(`Cart created for user ${user.email}`)
        } catch (err) {
            Logger.error(`Error in cartCreate method: ${err}`)
            return res.status(500).json({ error: 'An error has occurred.' })
        }
    }

    async deleteCartProducts(req: Request, res: Response) {
        try {
            const user = req.user
            await CartService.cartProdDeleteById(user)
            res.redirect('/api/cart')
        } catch (err) {
            Logger.error(`Error in cartProdDeleteById method: ${err}`)
        }
    }

    async getProductsByCartId(req: Request, res: Response) {
        Logger.info(`${req.method} request to '${req.originalUrl}' route: Getting products by Cart ID.`)
        try {
            const user = req.user
            const cartProducts = await CartService.getProductsByCartId(user)
            res.render('cart', { products: cartProducts, user: user })
        } catch (err) {
            Logger.error(`Error in getProductsByCartId method: ${err}`)
        }
    }

    async addToCartById(req: Request, res: Response) {
        try {
            const user = req.user
            const product = req.body

            await CartService.addToCartById(user, product)
            res.redirect('/api/cart')
        } catch (err) {
            Logger.error(`Error in addToCartById method: ${err}`)
        }
    }

    async deleteProductByCartId(req: Request, res: Response) {
        try {
            const user = req.user
            const product = req.body

            await CartService.deleteProductByCartId(user, product)
            res.redirect('/api/cart')
        } catch (err) {
            Logger.error(`Error in deleteProductByCartId method: ${err}`)
        }
    }

    async cartOrder(req: Request, res: Response) {
        try {
            const user = req.user

            const cartProducts = await CartService.getProductsByCartId(user)
            MailSender.newOrder(user, cartProducts)
            MessageService.newSMS(user)
            MessageService.newWhatsapp(user)
            res.redirect('/')
        } catch (err) {
            Logger.error(`Error in getProductsByCartId method: ${err}`)
        }
    }
}

export default new CartController