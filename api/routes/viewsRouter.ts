import { Router } from "express"
import { ProductController, SessionController } from "../controllers/indexController"
import checkUserAuth from "../middlewares/checkUserAuth"
import checkUserRole from "../middlewares/checkUserRole"

const viewsRouter = Router()

viewsRouter.get('/', checkUserAuth, async (req, res) => {
    const products = await ProductController.getAll(req, res)
	res.render("home", { logged: true, user: req.user, products: products })
})

viewsRouter//solo admins
    .route('/addProdForm')
    .get(checkUserRole ,SessionController.renderAddProdFormView)

export default viewsRouter