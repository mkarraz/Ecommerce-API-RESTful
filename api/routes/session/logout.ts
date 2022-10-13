import { Router } from "express"
import { SessionController } from "../../controllers/indexController"

export const sessionLogout = Router()

sessionLogout.post("/", SessionController.logout)
