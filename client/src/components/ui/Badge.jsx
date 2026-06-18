import React from "react";

export function Badge({ children, variant = "default", className = "", ...props }) {
  // Check if variant matches difficulty level, map to colors
  let styleVariant = variant.toLowerCase();
  if (styleVariant === "easy") {
    styleVariant = "success";
  } else if (styleVariant === "medium") {
    styleVariant = "warning";
  } else if (styleVariant === "hard") {
    styleVariant = "danger";
  }

  return (
    <span className={`badge badge-${styleVariant} ${className}`} {...props}>
      {children}
    </span>
  );
}
