import { connectToDB } from "@/lib/db.connect";
import { Question } from "@/lib/question.model";

export async function GET(req, res) {
  try {
    await connectToDB();
    const questions = await Question.find();
    if (questions) {
      return Response.json(questions);
    }
    return Response.json({ message: "Hello from Next.js!", questions: [] });
  } catch (error) {
    return Response.json({ message: "Hello from Next.js!", error: error });
  }
}
