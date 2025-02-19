import { NextResponse,NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Transaction from '@/models/Transaction';

export async function PUT(
    request: NextRequest,
    { params }: { params: Record<string,string>}
  ): Promise<NextResponse> {
    // Cast params.id to string (it may be a string | string[] by default)
    const id = params.id;
    const data = await request.json();
    try {
      const transaction = await Transaction.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json(transaction);
    } catch {
      return NextResponse.json({ error: 'Error updating budget' }, { status: 500 });
    }
  }

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch  {
    return NextResponse.json({ error: 'Error deleting transaction' }, { status: 500 });
  }
}
