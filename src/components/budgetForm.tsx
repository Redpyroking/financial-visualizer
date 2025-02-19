'use client';
import React, { useState, useEffect } from 'react';

// Define the interface for budget data
export interface BudgetData {
  category: string;
  month: number;
  year: number;
  budget: number;
}

// Extend BudgetData to include the MongoDB _id field
interface Budget extends BudgetData {
  _id: string;
}

// BudgetForm component for creating or editing a budget
interface BudgetFormProps {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
  onCancel?: () => void;
}

function BudgetForm({ onSubmit, initialData, onCancel }: BudgetFormProps) {
  const [category, setCategory] = useState(initialData?.category || 'Food');
  const [month, setMonth] = useState(initialData?.month || new Date().getMonth() + 1);
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear());
  const [budget, setBudget] = useState(initialData?.budget || 0);

  // Update state if initialData changes (for editing)
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

// Main BudgetsPage component with list, edit, and delete functionality
export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Fetch budgets from API
  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    setBudgets(data);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Handle form submission for creating or updating a budget
  const handleBudgetSubmit = async (data: BudgetData) => {
    if (editingBudget) {
      // Update existing budget
      await fetch(`/api/budgets/${editingBudget._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEditingBudget(null);
    } else {
      // Create new budget
      await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    fetchBudgets();
  };

  // Handle deletion of a budget
  const handleDelete = async (id: string) => {
    await fetch(`/api/budgets/${id}`, { method: 'DELETE' });
    fetchBudgets();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Budgeting</h2>
      {/* Budget Form */}
      <div className="mb-8">
        <BudgetForm
          onSubmit={handleBudgetSubmit}
          initialData={editingBudget || undefined}
          onCancel={() => setEditingBudget(null)}
        />
      </div>
      {/* List of Budgets with Edit/Delete */}
      <div>
        {budgets.map((budget) => (
          <div key={budget._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">{budget.category}</p>
              <p>
                {budget.month}/{budget.year} - ${budget.budget}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingBudget(budget)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(budget._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
