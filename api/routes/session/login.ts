import { Router } from 'express'
import passport from 'passport'
import { sessionController } from '../../controllers/indexController'

export const sessionLogin = Router()

sessionLogin.get('/', sessionController.renderLogin)
sessionLogin.post('/', passport.authenticate('login', { failureRedirect: '/login/failed', failureFlash: true }), sessionController.login)
sessionLogin.get('/failed', sessionController.renderFailedLogin)


/* FAILURE REDIRECT EXCPECTS:
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */