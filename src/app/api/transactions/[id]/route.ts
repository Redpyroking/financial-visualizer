import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();
  try {
    const transaction = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating transaction' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting transaction' }, { status: 500 });
  }
}
