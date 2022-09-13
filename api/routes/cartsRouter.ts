import { Router } from 'express'
import { cartCreate, cartDelete, getProductsByCartId, addToCartById, deleteProductByCartId } from '../controllers/cartControllers'

const cartsRouter = Router()

//Vinculo los endpoints con sus respectivos controllers.
cartsRouter.post('/cart', cartCreate)//Crea un nuevo cart.
cartsRouter.delete('/cart/:id', cartDelete)//Elimina cart by ID
cartsRouter.get('/cart/:id/products', getProductsByCartId)//Trae todos los productos guardados en el cart seleccionado.
cartsRouter.post('/cart/:id/products', addToCartById)//Añade un producto al carrito target.
cartsRouter.delete('/cart/:id/products/:id_prod', deleteProductByCartId)//Elimina un producto target de un carrito target.

export default cartsRouter