import { NextResponse,NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function PUT(request: NextRequest, context: unknown): Promise<NextResponse> {
    const { params } = context as { params: { id: string } };
    const id = params.id;
    const data = await request.json();
    try {
      const transaction = await Transaction.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json(transaction);
    } catch {
      return NextResponse.json({ error: 'Error updating transaction' }, { status: 500 });
    }
  }

  export async function DELETE(request: NextRequest, context: unknown): Promise<NextResponse> {
    const { params } = context as { params: { id: string } };
    try {
      await Transaction.findByIdAndDelete(params.id);
      return NextResponse.json({ message: 'Transaction deleted' });
    } catch {
      return NextResponse.json({ error: 'Error deleting transaction' }, { status: 500 });
    }
  }
