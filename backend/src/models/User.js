import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: true,
    },
    profileImage: {
      type: string,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
