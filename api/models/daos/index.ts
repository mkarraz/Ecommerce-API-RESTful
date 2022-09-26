import dotenv from 'dotenv'

dotenv.config()

let productDao: any
let cartDao: any

switch (process.env.DB_PROVIDER) {
    case 'fs':
        import('./products/daoProductsFilesystem').then((dao) => (productDao = dao.default))
        import('./cart/daoCartFilesystem').then((dao) => (cartDao = dao.default))
        break

    case 'mongodb':
        import('./products/daoProductsMongoDB').then((dao) => (productDao = dao.default))
        import('./cart/daoCartMongoDB').then((dao) => (cartDao = dao.default))
        break

    default:
    productDao = require('./products/daoProductsMongoDB') 
    cartDao = require('./cart/daoCartMongoDB')
    break;
}

export { productDao, cartDao }