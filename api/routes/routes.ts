import { Router } from 'express'
import { getAll, getById, addProduct, updateProductById, deleteProductById } from '../controllers/dbProductsControllers'
import { getFakerProducts } from '../controllers/fakerProductsController'
import { cartCreate, cartDelete, getProductsByCartId, addToCartById, deleteProductByCartId } from '../controllers/cartControllers'

const router = Router()
const server = require("express").Router()

//To access to form --> http://localhost:8080/index.html

//Vinculo los endpoints con sus respectivos controllers.
router.get("/products", getAll)//Trae todos los productos.
router.get("/products/:id", getById)//Trae producto por ID.
router.post("/products", addProduct)//Añade un nuevo producto (POST).
router.put("/products/:id", updateProductById)//Actualiza producto por ID (PUT).
router.delete("/products/:id", deleteProductById)//Elimina producto por ID (DELETE).

router.post('/cart', cartCreate)//Crea un nuevo cart.
router.delete('/cart/:id', cartDelete)//Elimina cart by ID
router.get('/cart/:id/products', getProductsByCartId)//Trae todos los productos guardados en el cart seleccionado.
router.post('/cart/:id/products', addToCartById)//Añade un producto al carrito target.
router.delete('/cart/:id/products/:id_prod', deleteProductByCartId)//Elimina un producto target de un carrito target.

//FAKER Endpoint
router.get('/api/products-test', getFakerProducts)//Trae todos los productos generados con Faker.

export default router