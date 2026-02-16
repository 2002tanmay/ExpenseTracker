import React from 'react';

function ExpenseTable({ expenses }) {
  if (!expenses.length) {
    return <p className="muted">No expenses yet. Add your first one above.</p>;
  }

  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th className="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id}>
            <td>{e.date}</td>
            <td>{e.category}</td>
            <td>{e.description}</td>
            <td className="right">₹{Number(e.amount).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;