import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Budget from '@/models/Budget';

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find({});
  return NextResponse.json(budgets);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  try {
    const budget = await Budget.create(data);
    return NextResponse.json(budget, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating budget' }, { status: 500 });
  }
}
