'use client';
import React, { useState } from 'react';

interface Transaction {
    _id?: string;
    amount: number;
    date: string;
    description: string;
    category: string;
  }

interface TransactionFormProps {
  onSubmit: (data: Transaction) => void;
  initialData?: Transaction;
}

export default function TransactionForm({ onSubmit, initialData = {} as Transaction }: TransactionFormProps) {
  const [amount, setAmount] = useState(initialData.amount || '');
  const [date, setDate] = useState(
    initialData.date ? new Date(initialData.date).toISOString().slice(0, 10) : ''
  );
  const [description, setDescription] = useState(initialData.description || '');
  const [category, setCategory] = useState(initialData.category || 'Uncategorized');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date) {
      alert('Amount and Date are required');
      return;
    }
    onSubmit({ amount: Number(amount), date, description, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1 w-full text-black"
        >
          <option value="Uncategorized">Uncategorized</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
