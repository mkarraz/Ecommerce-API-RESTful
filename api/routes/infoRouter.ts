import { Router } from 'express'
import { InfoController } from '../controllers/indexController'

const infoRouter = Router()

infoRouter
    .route('/')
    .get(InfoController.infoRender)


export default infoRouter