import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: { type: String, default: 'Uncategorized' } // For Stage 2
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
