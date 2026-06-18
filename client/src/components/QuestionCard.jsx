import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Trash2, Check, User, HelpCircle, FileText } from "lucide-react";

export function QuestionCard({ question, onDelete, currentUser }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setIsDeleting(true);
      try {
        await onDelete(question._id);
      } catch (err) {
        alert(err.message || "Failed to delete question");
        setIsDeleting(false);
      }
    }
  };

  // Allow deleting if the question is anonymous, or if the current user is the creator
  const canDelete = !question.createdBy || (currentUser && question.createdBy === currentUser.username);

  return (
    <Card className="question-card">
      <CardHeader className="question-card-header">
        <div className="question-meta-row">
          <Badge variant={question.type === "mcq" ? "info" : "secondary"}>
            {question.type === "mcq" ? "MCQ" : "Written"}
          </Badge>
          <Badge variant={question.difficulty}>
            {question.difficulty}
          </Badge>
          {question.subject && (
            <Badge variant="default" className="badge-subject">
              {question.subject}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="question-card-content">
        <div className="question-text-wrapper">
          <span className="question-icon-indicator">
            {question.type === "mcq" ? <HelpCircle size={18} /> : <FileText size={18} />}
          </span>
          <h3 className="question-text">{question.questionText}</h3>
        </div>

        {question.type === "mcq" ? (
          <div className="mcq-options-container">
            <span className="options-title-label">Options:</span>
            <ul className="options-list">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={`option-item ${option.isCorrect ? "correct-answer-item" : ""}`}
                >
                  <span className="option-marker">
                    {option.isCorrect ? <Check size={14} className="correct-check" /> : index + 1}
                  </span>
                  <span className="option-text-content">{option.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="description-answer-container">
            <span className="answer-title-label">Model Answer / Notes:</span>
            <p className="answer-text">{question.answer}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="question-card-footer">
        <div className="author-info">
          <User size={14} className="author-icon" />
          <span className="author-name">
            {question.createdBy || "Anonymous"}
          </span>
        </div>
        {canDelete && (
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            icon={<Trash2 size={15} />}
            title="Delete Question"
            className="delete-card-btn"
          />
        )}
      </CardFooter>
    </Card>
  );
}
