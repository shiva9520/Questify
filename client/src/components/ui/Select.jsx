import React from "react";

export function Select({
  label,
  id,
  error,
  className = "",
  options = [],
  children,
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
      <select id={id} required={required} className="custom-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
}
