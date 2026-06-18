import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "description"],
      required: true
    },
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      trim: true,
      default: "General"
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    },
    options: {
      type: [optionSchema],
      default: []
    },
    answer: {
      type: String,
      trim: true,
      default: ""
    },
    createdBy: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

questionSchema.pre("validate", function validateByType(next) {
  if (this.type === "mcq") {
    if (!this.options || this.options.length < 2) {
      this.invalidate("options", "MCQ questions need at least two options.");
    }

    const correctCount = this.options.filter((option) => option.isCorrect).length;
    if (correctCount !== 1) {
      this.invalidate("options", "MCQ questions need exactly one correct option.");
    }
  }

  if (this.type === "description" && !this.answer?.trim()) {
    this.invalidate("answer", "Description questions need an answer.");
  }

  next();
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
