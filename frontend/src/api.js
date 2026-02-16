const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function fetchExpenses(filters) {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.sort === 'date_desc') params.append('sort', 'date_desc');

  const url = `${API_BASE}/expenses${params.toString() ? `?${params.toString()}` : ''}`;

  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.error || `Failed to fetch expenses (${res.status})`);
  }
  return body;
}

export async function createExpense(data) {
  const idempotencyKey = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const res = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify(data)
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error || `Failed to create expense (${res.status})`);
  }
  return body;
}