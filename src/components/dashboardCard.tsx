'use client';
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="p-4 border rounded shadow m-2">
      <h3 className="font-bold">{title}</h3>
      <p>{value}</p>
    </div>
  );
}
