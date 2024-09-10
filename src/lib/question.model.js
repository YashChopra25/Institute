import mongoose from "mongoose";

const questionSubSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
});

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
    },
    questions: [questionSubSchema],
  },
  {
    timestamps: true,
  }
);

export const Question =
  mongoose.models?.Question || mongoose.model("Question", questionSchema);
