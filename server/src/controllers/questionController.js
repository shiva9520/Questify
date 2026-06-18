import Question from "../models/Question.js";

export async function createQuestion(req, res, next) {
  try {
    const questionData = {
      ...req.body,
      createdBy: req.user.username
    };
    const question = await Question.create(questionData);
    res.status(201).json(question);
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
  }
}

export async function getQuestions(req, res, next) {
  try {
    const { type, subject, difficulty } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (subject) filter.subject = subject;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
}

export async function getQuestionById(req, res, next) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json(question);
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestion(req, res, next) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Authorization: only the creator can delete their questions
    if (question.createdBy && question.createdBy !== req.user.username) {
      return res.status(403).json({ message: "You are not authorized to delete this question" });
    }

    await Question.findByIdAndDelete(req.params.id);
    return res.json({ message: "Question deleted" });
  } catch (error) {
    next(error);
  }
}

