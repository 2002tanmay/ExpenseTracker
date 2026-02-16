import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const numAmount = Number(amount);
    if (!Number.isFinite(numAmount) || numAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (!category.trim()) {
      setError('Category is required.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }

    try {
      setSubmitting(true);
      await onAdd({
        amount: numAmount.toFixed(2),
        category: category.trim(),
        description: description.trim(),
        date
      });
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 className="section-title">Add Expense</h2>
      <p className="muted">Quickly capture a new expense.</p>

      <div className="form-row">
        <label>
          Amount (₹)
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Food, Travel, Rent…"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label className="flex-1">
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional note"
          />
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving…' : 'Add expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;