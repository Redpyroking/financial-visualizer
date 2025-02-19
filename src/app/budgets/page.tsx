'use client';
import React, { useState, useEffect } from 'react';
import BudgetForm, { BudgetData } from '@/components/budgetForm';
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
  date: string;
  description: string;
  category: string;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  // Handle budget form submission
  const handleBudgetSubmit = async (data: BudgetData) => {
    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    fetchBudgets();
  };

  // Calculate actual spending for the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const actuals = transactions
    .filter((tx) => {
      const date = new Date(tx.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  // Prepare data for the comparison chart
  const chartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.budget,
    actual: actuals[budget.category] || 0,
  }));

  // Generate spending insights
  const insights: string[] = [];
  for (const cat in actuals) {
    const budgetItem = budgets.find((b) => b.category === cat);
    if (budgetItem && actuals[cat] > budgetItem.budget) {
      insights.push(`You have exceeded your ${cat} budget by $${(actuals[cat] - budgetItem.budget).toFixed(2)}`);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Budgeting</h2>
      <div className="mb-8">
        <BudgetForm onSubmit={handleBudgetSubmit} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Budget vs Actual</h3>
          <BudgetComparisonChart data={chartData} />
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Spending Insights</h3>
          <SpendingInsights insights={insights} />
        </div>
      </div>
    </div>
  );
}
