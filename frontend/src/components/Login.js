import React, { useState } from 'react';

const VALID_USERNAME = 'demo';
const VALID_PASSWORD = 'demo123';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        onLogin(username);
      } else {
        setError('Invalid username or password.');
      }
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="login-layout">
      <div className="login-card">
        <h1>Expense Tracker</h1>
        <p className="muted">
          Sign in to track your expenses and see where your money goes.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-footnote">
          Demo credentials: <strong>demo</strong> / <strong>demo123</strong>
        </p>
      </div>

      <div className="login-side">
        <h2>Stay on top of your spending</h2>
        <p>
          Add expenses in seconds, filter by category, and instantly see your totals for
          the period you care about.
        </p>
        <ul>
          <li>Fast capture of daily expenses</li>
          <li>Filter and sort with one click</li>
          <li>Automatic totals and averages</li>
        </ul>
      </div>
    </div>
  );
}

export default Login;