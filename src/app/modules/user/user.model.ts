import mongoose, { Schema } from "mongoose";
import { TUser, User } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, User>({
  id: { type: String, unique: true },
  password: { type: String, required: true, select: 0 },
  needsPasswordChange: { type: Boolean, required: true },
  passwordChangedAt: { type: Date },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required: true, default: 'student' },
  status: { type: String, enum: ['in-progress', 'blocked'], required: true },
  isDeleted: { type: Boolean, required: true }
},
  {
    timestamps: true,
  })

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next()
})

userSchema.statics.isUserExists = async function (id: string) {
  return await UserModel.findOne({ id }).select("+password")
}


userSchema.statics.isPasswordCorrect = async function (plain: string, hash: string) {
  return await bcrypt.compare(plain, hash)
}

userSchema.statics.isJWTIssuedbeforePassword = function (passwordChangeTime: Date, jwtIssuedTime: number) {
  const passChangeTime = new Date(passwordChangeTime).getTime()/1000;
  return passChangeTime > jwtIssuedTime ;
}


export const UserModel = mongoose.model<TUser, User>('User', userSchema)

