import { Schema, model } from 'mongoose';
import { TAdmin, TUserName } from './admin.interface';


// Mongoose Schema
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>({
  id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  designation: { type: String, required: true },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: false },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: false,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
});

// Mongoose Model
export const AdminModel = model<TAdmin>('Admin', adminSchema);

