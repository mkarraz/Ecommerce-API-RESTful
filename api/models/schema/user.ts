import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface User {
  password: string
  email: string
  comparePassword(reqPassword: string, password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true },
}, { collection: "users" })/* Nombre de la colección */

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

userSchema.methods.comparePassword = async (reqPassword: string, password: string): Promise<boolean> => {
  return await bcrypt.compareSync(reqPassword, password)
}

export default mongoose.model<User>('User', userSchema)