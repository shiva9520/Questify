import React from "react";

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  icon,
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const iconClass = icon ? "btn-with-icon" : "";

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${iconClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </button>
  );
}
