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
import { COLUMN_NAMES, CATEGORIES } from "../../lib/constants";
import { addQuestion } from "../../actions/add-question.js"; // Assume you have these actions
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { updateQuestion } from "../../actions/update-question";
import { deleteQuestion } from "../../actions/delete-question";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({
    question: "",
    category: "",
  });
  const [questions, setQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");

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
    try {
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
          fetchQuestions(); // Refresh the list of questions
          setLoading(false);
          return;
        }

        setErrors({ question: "", category: "" });

        toast.error("Failed to add question");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditQuestion = async () => {
    try {
      setLoading(true);
      if (editedQuestion.trim()) {
        const formData = new FormData();
        formData.append("category", currentQuestion.category);
        formData.append("oldQuestion", currentQuestion.question);
        formData.append("newQuestion", editedQuestion);
        const res = await updateQuestion(formData);
        if (res) {
          toast.success("Question updated successfully");
          setEditMode(false);
          setEditedQuestion("");
          fetchQuestions(); // Refresh the list of questions
          setLoading(false);
          return;
        }

        toast.error("Failed to update question");
        setLoading(false);
      } else {
        toast.error("Question text is required");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (obj) => {
    try {
      
      setLoading(true);
      const formData = new FormData();
      formData.append("category", obj.category);
      formData.append("question", obj.question);
      const res = await deleteQuestion(formData);
      if (res) {
        toast.success("Question deleted successfully");
        fetchQuestions(); // Refresh the list of questions
        setLoading(false);
        return;
      }

      toast.error("Failed to delete question");
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/questions");
      const fetchedQuestions = res.data.flatMap((category) =>
        category.questions.map((q) => ({
          ...q,
          category: category.category,
        }))
      );
      setQuestions(fetchedQuestions); // Update state with flattened questions
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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
            onClick={editMode ? handleEditQuestion : handleAddQuestion}
            className="bg-transparent border-2 rounded-full border-blue text-blue hover:bg-transparent"
          >
            {loading ? (
              <ClipLoader color="blue" size={20} />
            ) : editMode ? (
              "Save Changes"
            ) : (
              "Add Question"
            )}
          </Button>
        </div>

        {editMode && (
          <div className="mt-4">
            <Input
              type="text"
              placeholder="Edit question"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              className={`w-full ${errors.question ? "border-red-500" : ""}`}
            />
          </div>
        )}

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
                <TableRow key={question._id}>
                  <TableCell className="font-medium text-gray-700">
                    {question.question}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">
                    {question.category}
                  </TableCell>
                  <TableCell className="text-center">
                    <Pencil
                      className="w-4 h-4 text-gray-500 transition-all duration-300 cursor-pointer hover:text-gray-800"
                      onClick={() => {
                        setEditMode(true);
                        setCurrentQuestion(question);
                        setEditedQuestion(question.question);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Trash2
                      className="w-4 h-4 text-gray-500 transition-all duration-300 cursor-pointer hover:text-gray-800"
                      onClick={() =>
                        handleDeleteQuestion({
                          category: question.category,
                          question: question.question,
                        })
                      }
                    />
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
