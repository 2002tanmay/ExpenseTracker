const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createExpense, listExpenses, toApiExpense } = require('./store');

const app = express();
const PORT = process.env.PORT || 4000;

// Allow the React dev server
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(express.json());
app.use(morgan('dev'));

/**
 * POST /expenses
 * Body: { amount, category, description, date }
 * Optional header: Idempotency-Key (prevents duplicate creations on retries)
 */
app.post('/expenses', async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const idempotencyKey = req.headers['idempotency-key'];

    if (amount === undefined || category === undefined || !date) {
      return res.status(400).json({
        error: 'amount, category, and date are required'
      });
    }

    const amountNumber = Number(amount);
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({
        error: 'amount must be a positive number'
      });
    }

    // Expect date as YYYY-MM-DD; validate basic format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        error: 'date must be in YYYY-MM-DD format'
      });
    }

    const parsedDate = new Date(date + 'T00:00:00Z');
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        error: 'date is not a valid calendar date'
      });
    }

    const amountCents = Math.round(amountNumber * 100);

    const { expense, alreadyExisted } = await createExpense({
      amountCents,
      category: String(category).trim(),
      description: description ? String(description).trim() : '',
      date,
      idempotencyKey
    });

    const apiExpense = toApiExpense(expense);
    res.status(alreadyExisted ? 200 : 201).json(apiExpense);
  } catch (err) {
    console.error('Error in POST /expenses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /expenses
 * Query params:
 *   category (string, optional, exact match)
 *   sort=date_desc (optional -> sort by date, newest first)
 */
app.get('/expenses', async (req, res) => {
  try {
    const { category, sort } = req.query;
    const sortDateDesc = sort === 'date_desc';

    const items = await listExpenses({
      category: category || null,
      sortDateDesc
    });

    res.json(items.map(toApiExpense));
  } catch (err) {
    console.error('Error in GET /expenses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running.');
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});