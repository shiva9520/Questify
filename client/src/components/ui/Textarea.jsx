import React from "react";

export function Textarea({
  label,
  id,
  error,
  className = "",
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
      <textarea
        id={id}
        required={required}
        className="custom-textarea"
        {...props}
      />
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
}
