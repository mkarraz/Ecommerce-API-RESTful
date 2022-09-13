import { Router } from 'express'
import { getRandomNumbersController } from '../controllers/randomNumbersControllers'

const randomNumbersRouter: Router = Router()

randomNumbersRouter.get('/', getRandomNumbersController)

export default randomNumbersRouter