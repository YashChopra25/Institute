import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
