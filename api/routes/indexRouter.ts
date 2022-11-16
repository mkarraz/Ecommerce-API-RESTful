import { Router } from 'express'
import productsRouter from './productsRouter'
import cartRouter from './cartRouter'
import orderRouter from './orderRouter'
import infoRouter from './infoRouter'
import chatRouter from './chatRouter'
import { sessionLogin } from './session/login'
import { sessionLogout } from './session/logout'
import { sessionSignup } from './session/signup'


const indexRouter = Router()

indexRouter.use("/login", sessionLogin)
indexRouter.use("/logout", sessionLogout)
indexRouter.use("/signup", sessionSignup)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/order', orderRouter)
indexRouter.use('/api/info', infoRouter)
indexRouter.use('/api/chat', chatRouter)

export default indexRouter


