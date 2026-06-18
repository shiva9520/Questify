import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Layers, ListChecks, FileText } from "lucide-react";

export function StatsGrid({ stats }) {
  const statItems = [
    {
      label: "Total Questions",
      value: stats.total,
      icon: <Layers size={22} className="stat-icon-total" />,
      className: "stat-card-total"
    },
    {
      label: "Multiple Choice (MCQ)",
      value: stats.mcq,
      icon: <ListChecks size={22} className="stat-icon-mcq" />,
      className: "stat-card-mcq"
    },
    {
      label: "Description/Written",
      value: stats.description,
      icon: <FileText size={22} className="stat-icon-description" />,
      className: "stat-card-desc"
    }
  ];

  return (
    <section className="stats-grid" aria-label="Question library statistics">
      {statItems.map((item, index) => (
        <Card key={index} className={`stat-card ${item.className}`}>
          <CardContent className="stat-card-inner">
            <div className="stat-info">
              <span className="stat-label">{item.label}</span>
              <strong className="stat-value">{item.value}</strong>
            </div>
            <div className="stat-icon-wrapper">{item.icon}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
