import { Router } from 'express'
import { renderHome } from '../controllers/sessionControllers'

const home = Router()

home.get('/', renderHome)

export default home