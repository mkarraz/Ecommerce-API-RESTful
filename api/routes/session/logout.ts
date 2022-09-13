import { Router } from "express"
import { logout } from "../../controllers/sessionControllers"

const sessionLogout = Router()
sessionLogout.post("/", logout)

export default sessionLogout