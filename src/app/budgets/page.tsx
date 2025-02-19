'use client';
import React, { useState, useEffect } from 'react';
import BudgetComparisonChart from '@/components/budgetComparison';
import SpendingInsights from '@/components/spendingInsight';

interface Budget {
  _id?: string;
  category: string;
  month: number;
  year: number;
  budget: number;
}

interface Transaction {
  _id?: string;
  amount: number;
  date: string; // or Date if you plan to convert it later
  description: string;
  category: string;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data: Budget[] = await res.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data: Transaction[] = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  // Filter transactions for the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const actuals = transactions.filter(tx => {
    const date = new Date(tx.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = budgets.map(budget => ({
    category: budget.category,
    budget: budget.budget,
    actual: actuals[budget.category] || 0,
  }));

  // Generate simple spending insights
  const insights: string[] = [];
  for (const cat in actuals) {
    const budgetItem = budgets.find(b => b.category === cat);
    if (budgetItem && actuals[cat] > budgetItem.budget) {
      insights.push(`You have exceeded your ${cat} budget by $${actuals[cat] - budgetItem.budget}`);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Budgeting</h2>
      <BudgetComparisonChart data={chartData} />
      <SpendingInsights insights={insights} />
    </div>
  );
}
