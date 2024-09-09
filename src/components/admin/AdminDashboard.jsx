"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import {
  SAMPLE_QUESTIONS,
  COLUMN_NAMES,
  CATEGORIES,
} from "../../lib/constants";
import { addQuestion } from "../../actions/add-question";
import { getAllQuestions } from "../../actions/get-question";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({
    question: "",
    category: "",
  });

  // Validate inputs before adding a question
  const validateForm = () => {
    let hasError = false;
    const newErrors = { question: "", category: "" };

    if (!newQuestion.trim()) {
      newErrors.question = "Question is required";
      hasError = true;
    }
    if (!selectedCategory) {
      newErrors.category = "Category is required";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  // Handle form submission
  const handleAddQuestion = async () => {
    setLoading(true);
    if (validateForm()) {
      const formData = new FormData();
      formData.append("question", newQuestion);
      formData.append("category", selectedCategory);
      const res = await addQuestion(formData);
      if (res) {
        toast.success("Question added successfully");
        setNewQuestion("");
        setSelectedCategory("");
        fetchQuestions(); // Re-fetch questions after adding a new one
        setLoading(false);
        return;
      }

      setErrors({ question: "", category: "" });

      toast.error("Failed to add question");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data || []);
    } catch (error) {
      console.log("Error fetching questions: ", error);
    }
  };

  // Fetch questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="w-full min-h-screen px-5 mt-20 md:px-10">
      <div className="w-full max-w-screen-lg py-10 mx-auto">
        <div className="flex justify-between w-full ">
          <div className="flex gap-6">
            <div className="w-full md:min-w-[600px]">
              <Input
                type="text"
                placeholder="Add new question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className={`w-full ${errors.question ? "border-red-500" : ""}`}
              />
              {errors.question && (
                <p className="text-red-500 text-xs mt-1">{errors.question}</p>
              )}
            </div>

            <div>
              <Select
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <SelectTrigger
                  className={`w-[180px] ${
                    errors.category ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddQuestion}
            className="bg-transparent border-2 rounded-full border-blue text-blue hover:bg-transparent"
          >
            {loading ? <ClipLoader color="blue" size={20} /> : "Add Question"}
          </Button>
        </div>

        <div className="flex flex-col w-full mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMN_NAMES.map((column) => (
                  <TableHead key={column.id}>{column.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium text-gray-700">
                    {question.question}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    {question.category}
                  </TableCell>
                  <TableCell className="text-center">
                    <Pencil className="w-4 h-4 text-gray-500 transition-all duration-300 cursor-pointer hover:text-gray-800" />
                  </TableCell>
                  <TableCell>
                    <Trash2 className="w-4 h-4 text-gray-500 transition-all duration-300 cursor-pointer hover:text-gray-800" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
