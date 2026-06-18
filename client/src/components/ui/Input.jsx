import React from "react";

export function Input({
  label,
  id,
  error,
  className = "",
  type = "text",
  required = false,
  ...props
}) {
  return (
    <div className={`form-field ${error ? "has-error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
          {required && <span className="required-star"> *</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        required={required}
        className="custom-input"
        {...props}
      />
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
}
