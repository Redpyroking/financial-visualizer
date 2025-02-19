import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find({}).sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const data = await request.json();
  try {
    const transaction = await Transaction.create(data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating transaction' }, { status: 500 });
  }
}
