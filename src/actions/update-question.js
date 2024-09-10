"use server";

import { connectToDB } from "../lib/db.connect";
import { Question } from "../lib/question.model";

export const updateQuestion = async (formData) => {
  try {
    await connectToDB();

    const newCategory = formData.get("category");
    const oldQuestion = formData.get("oldQuestion");
    const newQuestion = formData.get("newQuestion");

    const questions = await Question.findOne({
      category: newCategory,
    });

    if (!questions) {
      return false;
    }

    const questionIndex = questions.questions.findIndex(
      (question) => question.question === oldQuestion
    );

    if (questionIndex === -1) {
      return false;
    }

    questions.questions[questionIndex].question = newQuestion;

    await questions.save();

    return true;
  } catch (error) {
    console.error("Error adding question: ", error);
    return false;
  }
};
