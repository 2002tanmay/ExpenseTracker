import React, { useEffect, useMemo, useState } from 'react';
import { fetchExpenses, createExpense } from './api';
import Login from './components/Login';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import Filters from './components/Filters';

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', sort: 'date_desc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError('');
      const data = await fetchExpenses(filters);
      setExpenses(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load expenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filters.category, filters.sort]);

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
    setExpenses([]);
  };

  const handleAddExpense = async (expense) => {
    try {
      setError('');
      await createExpense(expense);
      await loadExpenses();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create expense.');
      throw err;
    }
  };

  const handleFilterChange = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const totalAmount = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [expenses]
  );
  const avgAmount = useMemo(
    () => (expenses.length ? totalAmount / expenses.length : 0),
    [totalAmount, expenses.length]
  );

  // ---------- LOGIN SCREEN ----------
  if (!user) {
    return (
      <div className="app-shell">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // ---------- MAIN APP UI ----------
  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-logo" />
            <div>
              <div className="brand-title">Expense Tracker</div>
              <div className="brand-subtitle">
                Welcome back, <strong>{user.username}</strong>
              </div>
            </div>
          </div>
          <button className="secondary-btn" onClick={handleLogout}>
            Log out
          </button>
        </header>

        <main className="layout">
          <section className="main-column">
            <ExpenseForm onAdd={handleAddExpense} />

            <section className="card">
              <div className="summary-header">
                <div>
                  <h2 className="section-title">Expenses</h2>
                  <p className="muted">
                    Filter and review your expenses. Totals update with filters.
                  </p>
                </div>
                <div className="summary-stats">
                  <div>
                    <div className="summary-label">Visible total</div>
                    <div className="summary-value">₹{totalAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="summary-label">Items</div>
                    <div className="summary-value">{expenses.length}</div>
                  </div>
                  <div>
                    <div className="summary-label">Average</div>
                    <div className="summary-value">₹{avgAmount.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <Filters filters={filters} onChange={handleFilterChange} />

              {loading && <p className="muted">Loading expenses…</p>}
              {error && <p className="error">{error}</p>}

              {!loading && <ExpenseTable expenses={expenses} />}
            </section>
          </section>

          <aside className="side-panel">
            <h3>Spending snapshot</h3>
            <p className="muted">
              Insight into the expenses currently visible in the table.
            </p>
            <div className="side-grid">
              <div className="side-card">
                <div className="summary-label">Total</div>
                <div className="summary-value">₹{totalAmount.toFixed(2)}</div>
              </div>
              <div className="side-card">
                <div className="summary-label">Count</div>
                <div className="summary-value">{expenses.length}</div>
              </div>
              <div className="side-card">
                <div className="summary-label">Average</div>
                <div className="summary-value">₹{avgAmount.toFixed(2)}</div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
