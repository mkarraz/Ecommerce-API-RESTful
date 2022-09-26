import { Router } from "express"
import { sessionController } from "../../controllers/indexController"

export const sessionLogout = Router()

sessionLogout.post("/", sessionController.logout)
