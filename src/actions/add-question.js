"use server";

import { connectToDB } from "../lib/db.connect";
import { Question } from "../lib/question.model";

export const addQuestion = async (formData) => {
  try {
    await connectToDB();
    

    const newCategory = formData.get("category");
    const newQuestion = formData.get("question");

    const isCategoryAlreadyExist = await Question.findOne({
      category: newCategory,
    });

    if (isCategoryAlreadyExist) {
      await isCategoryAlreadyExist.updateOne({
        $push: { questions: { question: newQuestion } }, 
      });
      return true;
    }

    
    await Question.create({
      category: newCategory,
      questions: [{ question: newQuestion }], 
    });

    return true;
  } catch (error) {
    console.error("Error adding question: ", error); 
    return false; 
  }
};
