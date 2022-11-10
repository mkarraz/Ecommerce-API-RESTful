import { Router } from 'express'
import productsRouter from './productsRouter'
import cartRouter from './cartRouter'
import orderRouter from './orderRouter'
import viewsRouter from './viewsRouter'
import { sessionLogin  } from './session/login'
import { sessionLogout } from './session/logout'
import { sessionSignup } from './session/signup'
import checkUserAuth from '../middlewares/checkUserAuth'


const indexRouter = Router()

indexRouter.use("/login", sessionLogin)
indexRouter.use("/logout", sessionLogout)
indexRouter.use("/signup", sessionSignup)
/* indexRouter.use('/views', viewsRouter) */
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/order', orderRouter)

indexRouter.use('/', checkUserAuth, async (req, res) => {
    return res.redirect('/views')
})

export default indexRouter


