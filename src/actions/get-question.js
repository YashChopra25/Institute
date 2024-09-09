"use server";

import { connectToDB } from "../lib/db.connect";
import { Question } from "../lib/question.model";

export const getAllQuestions = async () => {
  try {
    await connectToDB();
    const questions = await Question.find({});
    console.log("questions are ", questions);
    if (questions) {
      return questions;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
