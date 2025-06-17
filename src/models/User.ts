
import { models, model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
   email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["parent", "professor", "admin"],
    default: "parent",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["parent", "professor", "admin"],
//     default: "parent",
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female"],
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
// });

// export default mongoose.models.User || mongoose.model("User", UserSchema);
