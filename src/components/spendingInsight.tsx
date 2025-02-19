'use client';
import React from 'react';

interface SpendingInsightsProps {
  insights: string[];
}

export default function SpendingInsights({ insights }: SpendingInsightsProps) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Spending Insights</h3>
      <ul className="list-disc ml-5">
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
}
