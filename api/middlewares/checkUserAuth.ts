import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'

const checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.isAuthenticated()) return next()
		return res.render("unauthorized")

	} catch (err) {
		Logger.error(`Error has occured when checkUserAuth method, ${err}`)
	}
}
export default checkUserAuth