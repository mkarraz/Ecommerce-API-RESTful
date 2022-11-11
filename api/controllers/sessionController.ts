import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'
import UserService from '../services/UserService'
import passport from 'passport'
import MailSender from '../utils/nodeMailer'

class SessionController {
	constructor(){}

	//LOGIN  
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.isAuthenticated())
				//next()
				res.status(200).json({ message: 'User logged'})
		} catch (err) {
			Logger.error(`Error when login method in SessionControllers, ${err}`)
		}
	}

	/* async renderLogin(req: Request, res: Response) {
		if (req.isAuthenticated()) {
			res.redirect('/')
		} else {
			res.render('login')
		}
	} */

	//LOGOUT
	async logout(req: Request, res: Response) {
		if (req.isAuthenticated()) {
			const userName = req.user
			req.session.destroy(() => {
				res.render('logout', { user: userName })
			})
		} else {
			res.redirect('/')
		}
	}

	//SIGNUP
	/* async renderSignUp(req: Request, res: Response) {
		if (req.isAuthenticated()) {
			res.redirect('/')
		} else {
			res.render('signup')
		}
	} */

	async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			/* console.log('entra controller')
			const averga = await passport.authenticate('signup', { failureRedirect: '/signup/failed', failureFlash: true}, 
			async (req,res) => {
				res.json({ message:"Success", user: req.user })
			}
			)
			console.log('averga', averga) */
			//const user = req.body
			//const data = await UserService.saveUser()
			//MailSender.newRegister(user)
			res.status(200).json({ message: 'User registered'})
			//next()
		} catch (error) {
			Logger.error(error)
		}
	}

	//FAILED SIGNUP
	async failedSignup(req: Request, res: Response) {
		//res.status(409).render('failedSignup', { message: req.flash("error")[0] })
		res.status(409).json({ error: req.flash("error")[0]})
	}

	//FAILED LOGIN
	async renderFailedLogin(req: Request, res: Response) {
		res.status(401).render('failedLogin', { message: req.flash("error")[0] })
	}

	//HOME
	/* async renderHome(req: Request, res: Response) {
		res.render('home', { user: req.user })
	} */

	//UPLOAD
	async renderUpload(req: Request, res: Response) {
		if (req.isAuthenticated()) {
			res.render('upload')
		} else {
			res.render('login')
		}
	}

	//UPLOAD SUCCESS  
	async uploadSuccess(req: Request, res: Response, next: NextFunction) {
		res.status(201).render('uploadSuccess')
		next()
	}
}

export default new SessionController