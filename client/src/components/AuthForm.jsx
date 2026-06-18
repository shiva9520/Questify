import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { loginUser, registerUser } from "../api";
import { Lock, User, UserPlus, LogIn, AlertCircle } from "lucide-react";

export function AuthForm({ onSuccess }) {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (activeTab === "register") {
      if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setFieldErrors({});
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validate()) return;

    setLoading(true);
    try {
      let data;
      if (activeTab === "login") {
        data = await loginUser({ username, password });
      } else {
        data = await registerUser({ username, password, confirmPassword });
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      onSuccess(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card custom-card">
        <div className="auth-header">
          <div className="auth-logo-badge">Q</div>
          <h2>Questify</h2>
          <p className="auth-subtitle">
            {activeTab === "login"
              ? "Welcome back! Please enter your credentials to access the Question Bank."
              : "Create an account to start creating, sharing, and organizing questions."}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="auth-tabs segmented-control">
          <button
            type="button"
            className={`segmented-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabChange("login")}
            disabled={loading}
          >
            <LogIn size={15} style={{ marginRight: 6, display: "inline" }} />
            Login
          </button>
          <button
            type="button"
            className={`segmented-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabChange("register")}
            disabled={loading}
          >
            <UserPlus size={15} style={{ marginRight: 6, display: "inline" }} />
            Register
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="auth-error-alert">
            <AlertCircle size={18} className="error-alert-icon" />
            <span className="error-alert-text">{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form-body">
          <Input
            label="Username"
            id="auth-username"
            type="text"
            required
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={fieldErrors.username}
            disabled={loading}
            autoComplete="username"
          />

          <Input
            label="Password"
            id="auth-password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            disabled={loading}
            autoComplete={activeTab === "login" ? "current-password" : "new-password"}
          />

          {activeTab === "register" && (
            <Input
              label="Confirm Password"
              id="auth-confirm-password"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={fieldErrors.confirmPassword}
              disabled={loading}
              autoComplete="new-password"
            />
          )}

          <Button
            type="submit"
            variant="primary"
            className="auth-submit-btn"
            disabled={loading}
            icon={activeTab === "login" ? <LogIn size={18} /> : <UserPlus size={18} />}
          >
            {loading ? "Please wait..." : activeTab === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
