import { cartDao } from "../models/daos"
import Logger from "../utils/logger"

const createNewCart = async (user: any) => {
    const data = await cartDao.createNewCart(user)
    return data
}

const cartProdDeleteById = async (user: any) => {
    const data = await cartDao.cartProdDeleteById(user)
    return data
}

const getProductsByCartId = async (user: any) => {
    const data = await cartDao.getProductsByCartId(user)
    return data
}

const addToCartById = async (user: any, product: any) => {
    const data = await cartDao.addToCartById(user, product)
    return data
}

const deleteProductByCartId = async (user: any, product: any) => {
    Logger.info(`Service: ${product}`)
    const data = await cartDao.deleteProductByCartId(user, product)
    return data
}

export const cartService = {
    createNewCart,
    cartProdDeleteById,
    getProductsByCartId,
    addToCartById,
    deleteProductByCartId
}