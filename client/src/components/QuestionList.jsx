import React from "react";
import { Card, CardHeader, CardContent } from "./ui/Card";
import { Select } from "./ui/Select";
import { QuestionCard } from "./QuestionCard";
import { ListChecks, SearchX, Inbox } from "lucide-react";

export function QuestionList({
  questions,
  loading,
  filterType,
  onFilterChange,
  onDeleteQuestion,
  currentUser
}) {
  const filterOptions = [
    { value: "", label: "All Questions" },
    { value: "mcq", label: "Multiple Choice (MCQ)" },
    { value: "description", label: "Written / Description" }
  ];

  return (
    <Card className="panel-card question-library-panel">
      <CardHeader className="panel-header-row">
        <div className="panel-title-wrapper">
          <ListChecks size={22} className="panel-header-icon" />
          <h2>Question Library</h2>
        </div>
        <div className="panel-filter-wrapper">
          <Select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            options={filterOptions}
            className="filter-select-field"
            title="Filter by question type"
          />
        </div>
      </CardHeader>

      <CardContent className="panel-body">
        {loading ? (
          <div className="loading-state-wrapper">
            <div className="loader-spinner" />
            <p className="loading-text">Fetching latest questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="empty-state-wrapper">
            {filterType ? (
              <SearchX size={48} className="empty-state-icon" />
            ) : (
              <Inbox size={48} className="empty-state-icon" />
            )}
            <h3>No Questions Found</h3>
            <p className="empty-state-subtitle">
              {filterType
                ? `No ${filterType.toUpperCase()} questions match your filter.`
                : "The library is currently empty. Be the first to add a question using the form!"}
            </p>
          </div>
        ) : (
          <div className="questions-grid-layout">
            {questions.map((question) => (
              <QuestionCard
                key={question._id}
                question={question}
                onDelete={onDeleteQuestion}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
