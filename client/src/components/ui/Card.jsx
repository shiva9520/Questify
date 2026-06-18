import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div className={`custom-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`custom-card-header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`custom-card-content ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`custom-card-footer ${className}`} {...props}>
      {children}
    </div>
  );
}
