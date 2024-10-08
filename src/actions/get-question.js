"use server";

import { connectToDB } from "../lib/db.connect";
import { Question } from "../lib/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find();
    if (questions) {
      return questions;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting questions: ", error);
    return null;
  }
};
