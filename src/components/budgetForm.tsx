'use client';
import React, { useState, useEffect } from 'react';

export interface BudgetData {
  category: string;
  month: number;
  year: number;
  budget: number;
}

interface BudgetFormProps {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
  onCancel?: () => void;
}

export default function BudgetForm({ onSubmit, initialData, onCancel }: BudgetFormProps) {
  const [category, setCategory] = useState(initialData?.category || 'Food');
  const [month, setMonth] = useState(initialData?.month || new Date().getMonth() + 1);
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear());
  const [budget, setBudget] = useState(initialData?.budget || 0);

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setMonth(initialData.month);
      setYear(initialData.year);
      setBudget(initialData.budget);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ category, month, year, budget });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md">
      <div>
        <label className="block mb-1 font-semibold">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1 w-full text-black"
        >
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Month:</label>
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Budget Amount:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {initialData ? 'Update Budget' : 'Set Budget'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
