const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function fetchQuestions(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value)
  );
  
  const response = await fetch(`${API_URL}/questions?${params.toString()}`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    throw new Error("Failed to fetch questions");
  }

  return response.json();
}

export async function createQuestion(payload) {
  const response = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    throw new Error(data.message || "Failed to create question");
  }

  return data;
}

export async function deleteQuestion(id) {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete question");
  }

  return true;
}

export async function loginUser(payload) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function registerUser(payload) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

