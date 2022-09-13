import { Router } from 'express'
import renderProcessInfo from '../controllers/processInfo'

const router: Router = Router()

router.get('/', renderProcessInfo)

export default router