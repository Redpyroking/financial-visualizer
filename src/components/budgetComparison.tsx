'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetComparisonChartProps {
  data: { category: string; budget: number; actual: number }[];
}

export default function BudgetComparisonChart({ data }: BudgetComparisonChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" />
        <Bar dataKey="actual" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
