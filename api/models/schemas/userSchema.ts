import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from '../../interfaces'
import { NextFunction } from 'express'
import { CartController } from '../../controllers/indexController'
import Logger from '../../utils/logger'


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  picture: { type: String, required: true  },
  isAdmin: { type: String, required: true }
}, { collection: 'users' })

userSchema.pre('save', async function (next) {/* .pre: Realiza esto antes de realizar la operación 'save' */
  const user = this
  if (!user) return next()
  try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash//setea la contraseña encriptada
      next()
  } catch (err: any) {
      next(err)
  }
})

userSchema.post('save', async function (res: any) {
  try {
    const user = { id: this.id, email: this.email }
    await CartController.cartCreate(res, user)

  } catch (err: any) {
    Logger.error(`Error trying to update user cartId: ${err}`)
  }
})

userSchema.methods.comparePassword = async (reqPassword: string, password: string): Promise<boolean> => {
  return await bcrypt.compareSync(reqPassword, password)
}

export default mongoose.model<User>('User', userSchema)