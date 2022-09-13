import { Request, Response, NextFunction } from 'express'

const checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next()
	return res.render("unauthorized")
}
export default checkUserAuth