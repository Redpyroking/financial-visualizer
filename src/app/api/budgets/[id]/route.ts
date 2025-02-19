import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Budget from '@/models/Budget';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();
  try {
    const budget = await Budget.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(budget);
  } catch (_error) {
    return NextResponse.json({ error: 'Error updating budget' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Budget.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Budget deleted' });
  } catch (_error) {
    return NextResponse.json({ error: 'Error deleting budget' }, { status: 500 });
  }
}
