import { NextResponse,NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Budget from '@/models/Budget';

export async function PUT(request: NextRequest, context: unknown): Promise<NextResponse> {
    const { params } = context as { params: { id: string } };
    const id = params.id;
    const data = await request.json();
    try {
      const budget = await Budget.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json(budget);
    } catch {
      return NextResponse.json({ error: 'Error updating budget' }, { status: 500 });
    }
  }

export async function DELETE(request: NextRequest, context: unknown): Promise<NextResponse> {
    await connectToDatabase();
    const { params } = context as { params: { id: string } };
  try {
    await Budget.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Budget deleted' });
  } catch {
    return NextResponse.json({ error: 'Error deleting budget' }, { status: 500 });
  }
}
