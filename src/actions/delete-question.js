"use server";

import { connectToDB } from "../lib/db.connect";
import { Question } from "../lib/question.model";

export const deleteQuestion = async (formData) => {
  try {
    await connectToDB();

    
    const category = formData.get("category");
    const question = formData.get("question");

    const isCategoryAlreadyExist = await Question.findOne({
      category: category,
    });

    if (!isCategoryAlreadyExist) {
      return false;
    }

    const questionIndex = isCategoryAlreadyExist.questions.findIndex(
      (q) => q.question === question
    );

    if (questionIndex === -1) {
      return false;
    }

    isCategoryAlreadyExist.questions.splice(questionIndex, 1);

    await isCategoryAlreadyExist.save();

    return true;
  } catch (error) {
    console.error("Error adding question: ", error);
    return false;
  }
};
