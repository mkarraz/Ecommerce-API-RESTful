import ProductService from '../services/ProductService'

const createProduct = async ({ data }: any) => {
    const newProduct = await ProductService.addProduct(data)
    return newProduct
}

const getProduct = async ({ id }: any) => {
    const product = await ProductService.getProductById(id)
    if (!product) throw new Error("Cannot find requested product")
    return product
}

const getProducts = async ({ key, value }: any) => {
    const products = await ProductService.getAllProducts()
    if (key && value) {
        return products.filter((product: any) => product[key] == value)
    } else {
        return products
    }
}

const updateProduct = async ({ id, data }: any) => {
    const productUpdated = await ProductService.updateProductById(id, data)
    if (productUpdated === undefined || productUpdated === null) throw new Error("Cannot find requested product")
    return productUpdated
}

const deleteProduct = async ({ id }: any) => {
    const productDeleted = await ProductService.deleteProductById(id)
    if (productDeleted === undefined || productDeleted === null) throw new Error("Cannot find requested product")

    return productDeleted
}

export const graphProductController = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}