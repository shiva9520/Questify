import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/Card";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { BookOpen, Check, Save, Sparkles, HelpCircle, AlertCircle } from "lucide-react";

const emptyMcqOptions = [
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false }
];

const initialForm = {
  type: "mcq",
  questionText: "",
  subject: "",
  difficulty: "medium",
  answer: "",
  createdBy: "",
  options: emptyMcqOptions
};

export function QuestionForm({ onSubmit, status, setStatus }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateOption = (index, changes) => {
    setForm((current) => ({
      ...current,
      options: current.options.map((option, optionIndex) => {
        if (optionIndex !== index) return option;
        return { ...option, ...changes };
      })
    }));
  };

  const chooseCorrectOption = (index) => {
    setForm((current) => ({
      ...current,
      options: current.options.map((option, optionIndex) => ({
        ...option,
        isCorrect: optionIndex === index
      }))
    }));
  };

  const handleTypeChange = (type) => {
    setForm((current) => ({
      ...current,
      type,
      options: type === "mcq" ? current.options : emptyMcqOptions
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    const payload = {
      ...form,
      subject: form.subject || "General",
      options:
        form.type === "mcq"
          ? form.options.filter((option) => option.text.trim())
          : []
    };

    if (form.type === "description") {
      payload.answer = form.answer;
    }

    try {
      await onSubmit(payload);
      setForm(initialForm);
      setStatus({ text: "Question uploaded successfully!", type: "success" });
    } catch (error) {
      setStatus({ text: error.message || "Failed to submit question", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  return (
    <Card className="panel-card form-panel">
      <CardHeader className="panel-header-row">
        <div className="panel-title-wrapper">
          <BookOpen size={22} className="panel-header-icon" />
          <h2>Add Question</h2>
        </div>
      </CardHeader>

      <CardContent className="panel-body">
        <form onSubmit={handleSubmit} className="modular-form">
          {/* Segmented Type Picker */}
          <div className="segmented-control" role="tablist" aria-label="Question type">
            <button
              type="button"
              className={`segmented-btn ${form.type === "mcq" ? "active" : ""}`}
              onClick={() => handleTypeChange("mcq")}
              role="tab"
              aria-selected={form.type === "mcq"}
            >
              Multiple Choice (MCQ)
            </button>
            <button
              type="button"
              className={`segmented-btn ${form.type === "description" ? "active" : ""}`}
              onClick={() => handleTypeChange("description")}
              role="tab"
              aria-selected={form.type === "description"}
            >
              Written / Desc
            </button>
          </div>

          {/* Question Text */}
          <Textarea
            label="Question Prompt"
            id="questionText"
            value={form.questionText}
            onChange={(e) => updateField("questionText", e.target.value)}
            placeholder="Type your question prompt here..."
            required
            rows={3}
          />

          {/* Row for Subject & Difficulty */}
          <div className="form-row-grid">
            <Input
              label="Subject / Domain"
              id="subject"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="e.g. JavaScript, React, System Design"
            />

            <Select
              label="Difficulty"
              id="difficulty"
              value={form.difficulty}
              onChange={(e) => updateField("difficulty", e.target.value)}
              options={difficultyOptions}
            />
          </div>

          {/* Created By */}
          <Input
            label="Author / Contributor"
            id="createdBy"
            value={form.createdBy}
            onChange={(e) => updateField("createdBy", e.target.value)}
            placeholder="Your name or company"
          />

          {/* MCQ Options Block */}
          {form.type === "mcq" ? (
            <div className="mcq-options-block">
              <span className="section-label">Answer Options (Select the correct one)</span>
              <div className="options-rows-grid">
                {form.options.map((option, index) => (
                  <div className="option-input-row" key={index}>
                    <button
                      type="button"
                      className={`correct-toggle-btn ${option.isCorrect ? "selected" : ""}`}
                      onClick={() => chooseCorrectOption(index)}
                      title={option.isCorrect ? "Correct answer" : "Mark as correct answer"}
                    >
                      <Check size={16} />
                    </button>
                    <input
                      type="text"
                      className="option-text-input"
                      value={option.text}
                      onChange={(e) => updateOption(index, { text: e.target.value })}
                      placeholder={`Option ${index + 1}`}
                      required={index < 2} // require at least 2 options
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Model Answer for Description */
            <Textarea
              label="Model Answer / Key Points"
              id="answer"
              value={form.answer}
              onChange={(e) => updateField("answer", e.target.value)}
              placeholder="Provide a comprehensive answer or evaluation criteria..."
              required
              rows={4}
            />
          )}

          {/* Feedback Status Alert */}
          {status && status.text && (
            <div className={`form-alert alert-${status.type}`}>
              {status.type === "success" ? (
                <Check size={18} className="alert-icon" />
              ) : (
                <AlertCircle size={18} className="alert-icon" />
              )}
              <span className="alert-message">{status.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            icon={<Save size={18} />}
            variant="primary"
            className="submit-btn"
          >
            {submitting ? "Uploading Question..." : "Upload to Library"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
