import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  month: { type: Number, required: true }, // 1-12
  year: { type: Number, required: true },
  budget: { type: Number, required: true },
});

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
