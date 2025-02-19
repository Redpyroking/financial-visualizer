'use client';
import React, { useEffect, useState } from 'react';
import TransactionList from '@/components/transactionList';
import TransactionForm from '@/components/transactionForm';
import MonthlyExpensesChart from '@/components/monthlyExpensesChart';

interface Transaction {
    _id?: string;
    amount: number;
    date: string;
    description: string;
    category: string;
  }

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction| null>(null);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (transaction: Transaction) => {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    fetchTransactions();
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = async (transaction: Transaction) => {
    await fetch(`/api/transactions/${editingTransaction?._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    setEditingTransaction(null);
    fetchTransactions();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const monthlyData = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(monthlyData).map((month) => ({ month, total: monthlyData[month] }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {editingTransaction ? (
        <TransactionForm onSubmit={handleUpdate} initialData={editingTransaction} />
      ) : (
        <TransactionForm onSubmit={handleAdd} />
      )}
      <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
      <h3 className="mt-8 text-xl font-semibold">Monthly Expenses</h3>
      <MonthlyExpensesChart data={chartData} />
    </div>
  );
}
