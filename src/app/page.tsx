'use client';
import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/dashboardCard';
import TransactionList from '@/components/transactionList';
import CategoryPieChart from '@/components/categoryPieChart';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
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
    total: categoryBreakdown[cat]
  }));

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex space-x-4">
        <DashboardCard title="Total Expenses" value={`$${totalExpenses}`} />
        {/* You can add more cards as needed */}
      </div>
      <h3 className="mt-8 text-xl font-semibold">Category Breakdown</h3>
      <CategoryPieChart data={pieData} />
      <h3 className="mt-8 text-xl font-semibold">Recent Transactions</h3>
      <TransactionList transactions={recentTransactions} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
