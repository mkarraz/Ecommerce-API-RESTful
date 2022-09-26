import { Router } from 'express'
import passport from 'passport'
import { sessionController } from '../../controllers/indexController'
import user from '../../models/schemas/userSchema'
import Logger from '../../utils/logger'
import { upload } from '../../utils/multer'

export const sessionSignup = Router()

sessionSignup.get('/', sessionController.renderSignUp)
sessionSignup.post('/', passport.authenticate('signup', { failureRedirect: '/signup/failed', failureFlash: true}), sessionController.signUp)
sessionSignup.get('/upload', sessionController.renderUpload)
sessionSignup.post('/upload', upload.single('picture'), async (req: any, res: any, next: any) => {
    const file = req.file
    if (!file) {
        const error = { message: 'Error when uploading file.', statusCode: 400 }
        return next(error)
    }

    const newData = {
        email: req.user.email,
        password: req.user.password,
        name: req.user.name,
        address: req.user.address,
        age: req.user.age,
        phoneNumber: req.user.phoneNumber,
        picture: `${file.filename}`,
        isAdmin: req.user.isAdmin
    }

    try {
        const updatedData = await user.updateOne({ _id: req.user.id }, newData)

        if (updatedData.matchedCount === 0) {
            const error = { message: "User not found", statusCode: 400 }
            return next(error)
        }

    } catch (err) {
        Logger.error(`Error trying to update users avatar: ${err}`)
    }
    next()
  }, sessionController.uploadSuccess)
sessionSignup.get('/failed', sessionController.renderFailedSignup)

/* FAILURE REDIRECT EXCPECTS:
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */
