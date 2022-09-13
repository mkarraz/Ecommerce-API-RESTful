import { Router } from 'express'
import { getAll, getById, addProduct, updateProductById, deleteProductById } from '../controllers/dbProductsControllers'
import { getFakerProducts } from '../controllers/fakerProductsController'

const productsRouter = Router()

//To access to form --> http://localhost:8080/index.html

//Vinculo los endpoints con sus respectivos controllers.
productsRouter.get("/products", getAll)//Trae todos los productos.
productsRouter.get("/products/:id", getById)//Trae producto por ID.
productsRouter.post("/products", addProduct)//Añade un nuevo producto (POST).
productsRouter.put("/products/:id", updateProductById)//Actualiza producto por ID (PUT).
productsRouter.delete("/products/:id", deleteProductById)//Elimina producto por ID (DELETE).

//FAKER Endpoint
productsRouter.get('/api/products-test', getFakerProducts)//Trae todos los productos generados con Faker.

export default productsRouter