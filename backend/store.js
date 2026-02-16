// Simple JSON-file persistence for expenses.
// Data file is created automatically if it does not exist.

const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'db.json');

async function ensureDbFile() {
  try {
    await fs.access(DB_FILE);
  } catch (err) {
    // File does not exist; create default structure
    const defaultDb = { nextId: 1, expenses: [], idempotency: {} };
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf8');
  }
}

async function readDb() {
  await ensureDbFile();
  const raw = await fs.readFile(DB_FILE, 'utf8');
  return JSON.parse(raw);
}

async function saveDb(db) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

/**
 * Create a new expense.
 * Handles optional idempotencyKey: same key -> returns same expense.
 */
async function createExpense({ amountCents, category, description, date, idempotencyKey }) {
  const db = await readDb();

  if (idempotencyKey && db.idempotency[idempotencyKey]) {
    const existingId = db.idempotency[idempotencyKey];
    const existing = db.expenses.find((e) => e.id === existingId);
    return { expense: existing, alreadyExisted: true };
  }

  const nowIso = new Date().toISOString();

  const expense = {
    id: db.nextId++,
    amount_cents: amountCents,
    category,
    description: description || '',
    date,       // expected format YYYY-MM-DD
    created_at: nowIso
  };

  db.expenses.push(expense);

  if (idempotencyKey) {
    db.idempotency[idempotencyKey] = expense.id;
  }

  await saveDb(db);

  return { expense, alreadyExisted: false };
}

/**
 * List expenses with optional category filter and date-desc sort.
 */
async function listExpenses({ category, sortDateDesc }) {
  const db = await readDb();
  let items = db.expenses.slice();

  if (category) {
    const normalized = String(category).toLowerCase();
    items = items.filter((e) => e.category.toLowerCase() === normalized);
  }

  if (sortDateDesc) {
    items.sort((a, b) => {
      // Sort by date (YYYY-MM-DD), newest first.
      if (a.date === b.date) {
        // Tie-breaker: created_at
        return b.created_at.localeCompare(a.created_at);
      }
      return b.date.localeCompare(a.date);
    });
  }

  return items;
}

function toApiExpense(expense) {
  return {
    id: expense.id,
    amount: (expense.amount_cents / 100).toFixed(2),
    category: expense.category,
    description: expense.description,
    date: expense.date,
    created_at: expense.created_at
  };
}

module.exports = {
  createExpense,
  listExpenses,
  toApiExpense
};