import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>({
  id: { type: String, unique: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, required: true },
  role: { type: String, enum: ['admin', 'student', 'faculty'], required: true, default: 'student' },
  status: { type: String, enum: ['in-progress', 'blocked'], required: true },
  isDeleted: { type: Boolean, required: true }
},
  {
    timestamps: true,
  })

userSchema.pre('save', async function(next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user  = this;
  user.password = await bcrypt.hash(user.password, 10);
  next()
})

export const UserModel = mongoose.model<TUser>('User', userSchema)

