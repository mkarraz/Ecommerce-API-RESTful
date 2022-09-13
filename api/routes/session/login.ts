import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../../models/schema/user'
import { renderLogin, login, renderFailedLogin } from '../../controllers/sessionControllers'
import Logger from '../../utils/logger'

const sessionLogin = Router()

passport.use("login", new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email: string, password: string, done) => {
		try {
			const user = await User.findOne({email}).exec()
			if (!user) return done(null, false, { message: "User doesn't exist" }) //2)
			const valid = await user.comparePassword(password, user.password)
			if (!valid) return done(null, false, { message: "Wrong password" }) //2)
			Logger.info(user)
			return done(null, user) //1)
		}
		catch (err) {
			done(err) //3)
		}
	}
))

sessionLogin.get('/', renderLogin)
sessionLogin.post('/', passport.authenticate('login', { failureRedirect: '/login/failed', failureFlash: true }), login)
sessionLogin.get('/failed', renderFailedLogin)


/* FAILURE REDIRECT EXCPECTS:
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */

export default sessionLogin