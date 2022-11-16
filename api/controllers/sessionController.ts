import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'

class SessionController {
	constructor(){}

	//LOGIN  
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.isAuthenticated())
				res.status(200).json({ message: 'User logged'})
		} catch (err) {
			Logger.error(`Error when login method in SessionControllers, ${err}`)
		}
	}

	//FAILED LOGIN
	async renderFailedLogin(req: Request, res: Response) {
		res.status(403).json({ error: req.flash("error")[0] })
	}

	//LOGOUT
	async logout(req: Request, res: Response) {
		try {
			if (req.isAuthenticated()) {
				req.session.destroy(() => {
					res.status(200).json({ message: 'User logged out' })
				})
			}
		} catch (err) {
			Logger.error(`Error when logout method in SessionControllers, ${err}`)
		}
	}

	//SIGNUP
	async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(200).json({ message: 'User registered'})
		} catch (err) {
			Logger.error(`Error when signup method in SessionControllers, ${err}`)
		}
	}

	//FAILED SIGNUP
	async failedSignup(req: Request, res: Response) {
		res.status(409).json({ error: req.flash("error")[0]})
	}

	//UPLOAD SUCCESS  
	async uploadSuccess(req: Request, res: Response, next: NextFunction) {
		res.status(200).json({ message: 'Photo Uploaded'})
	}
}

export default new SessionController