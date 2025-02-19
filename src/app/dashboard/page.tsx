'use client';
import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/dashboardCard';
import TransactionList from '@/components/transactionList';
import CategoryPieChart from '@/components/categoryPieChart';

interface Transaction {
  _id?: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate totals and breakdown
  const totalExpenses = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const categoryBreakdown = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(categoryBreakdown).map((cat) => ({
    category: cat,
    total: categoryBreakdown[cat],
  }));

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Total Expenses" value={`$${totalExpenses.toFixed(2)}`} />
        <DashboardCard title="Transactions Count" value={`${transactions.length}`} />
        <DashboardCard
          title="Average Expense"
          value={`$${transactions.length ? (totalExpenses / transactions.length).toFixed(2) : '0'}`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
          <CategoryPieChart data={pieData} />
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <TransactionList transactions={recentTransactions} onEdit={() => {}} onDelete={() => {}} />
        </div>
      </div>
    </div>
  );
}
