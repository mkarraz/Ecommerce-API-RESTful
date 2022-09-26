import { productDao } from "../models/daos"

const getAllProducts = async () => {
    const data = await productDao.getAll()
    return data
}

const getProductById = async (id: any) => {
    const data = await productDao.getById(Number(id))
    return data
}

const addProduct = async (product: any) => {
    const data = await productDao.addProduct(product)
    return data
}

const updateProductById = async (id: any, product: any) => {
    const data = await productDao.updateProductById(Number(id), product)
    return data
}

const deleteProductById = async (id: any) => {
    const data = await productDao.deleteProductById(Number(id))
    return data
}

export const productService = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
}