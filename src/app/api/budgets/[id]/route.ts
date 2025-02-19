import { NextResponse,NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import Budget from '@/models/Budget';

export async function PUT(
    request: NextRequest,
    { params }: { params: {id:string} }
  ): Promise<NextResponse> {
    // Cast params.id to string (it may be a string | string[] by default)
    const id = params.id;
    const data = await request.json();
    try {
      const budget = await Budget.findByIdAndUpdate(id, data, { new: true });
      return NextResponse.json(budget);
    } catch {
      return NextResponse.json({ error: 'Error updating budget' }, { status: 500 });
    }
  }

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Budget.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Budget deleted' });
  } catch  {
    return NextResponse.json({ error: 'Error deleting budget' }, { status: 500 });
  }
}
