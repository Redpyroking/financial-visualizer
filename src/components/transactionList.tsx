'use client';
import React from 'react';

interface TransactionListProps {
  transactions: any[];
  onEdit: (tx: any) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Amount</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx._id}>
            <td className="border p-2">{tx.amount}</td>
            <td className="border p-2">{new Date(tx.date).toLocaleDateString()}</td>
            <td className="border p-2">{tx.description}</td>
            <td className="border p-2">{tx.category}</td>
            <td className="border p-2">
              <button onClick={() => onEdit(tx)} className="mr-2 text-blue-600">Edit</button>
              <button onClick={() => onDelete(tx._id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
