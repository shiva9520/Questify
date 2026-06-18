import React, { useEffect, useMemo, useState } from "react";
import { fetchQuestions, createQuestion, deleteQuestion } from "./api.js";
import { ThemeProvider } from "./components/ThemeContext";
import { Topbar } from "./components/Topbar";
import { StatsGrid } from "./components/StatsGrid";
import { QuestionForm } from "./components/QuestionForm";
import { QuestionList } from "./components/QuestionList";
import { AuthForm } from "./components/AuthForm";

function QuestionBankApp() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [questions, setQuestions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [formStatus, setFormStatus] = useState(null); // { text, type: 'success' | 'error' }
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    const mcq = questions.filter((question) => question.type === "mcq").length;
    return {
      total: questions.length,
      mcq,
      description: questions.length - mcq
    };
  }, [questions]);

  async function loadQuestions() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchQuestions({ type: filterType });
      setQuestions(data);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  }

  // Load questions when filterType or user changes
  useEffect(() => {
    if (user) {
      loadQuestions();
    } else {
      setQuestions([]);
    }
  }, [filterType, user]);

  // Handle adding a new question
  async function handleAddQuestion(payload) {
    await createQuestion(payload);
    // Reload the questions library
    await loadQuestions();
  }

  // Handle deleting a question
  async function handleDeleteQuestion(id) {
    await deleteQuestion(id);
    // Reload the questions library
    await loadQuestions();
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return (
      <main className="app-shell auth-shell">
        <AuthForm onSuccess={handleAuthSuccess} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      {/* Top Header Section */}
      <Topbar onRefresh={loadQuestions} loading={loading} user={user} onLogout={handleLogout} />

      {/* Numerical Stats Cards */}
      <StatsGrid stats={stats} />

      {/* Main Workspace Layout */}
      <div className="workspace">
        {/* Left column: Add Question Form */}
        <QuestionForm
          onSubmit={handleAddQuestion}
          status={formStatus}
          setStatus={setFormStatus}
        />

        {/* Right column: Question Library cards list */}
        <QuestionList
          questions={questions}
          loading={loading}
          filterType={filterType}
          onFilterChange={setFilterType}
          onDeleteQuestion={handleDeleteQuestion}
          currentUser={user}
        />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QuestionBankApp />
    </ThemeProvider>
  );
}

