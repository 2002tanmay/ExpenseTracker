import React from 'react';

function Filters({ filters, onChange }) {
  const handleCategoryChange = (e) => {
    onChange({ category: e.target.value });
  };

  const handleSortChange = (e) => {
    onChange({ sort: e.target.checked ? 'date_desc' : '' });
  };

  return (
    <div className="filters">
      <div className="form-row">
        <label className="flex-1">
          Filter by category
          <input
            type="text"
            placeholder="Exact category name"
            value={filters.category}
            onChange={handleCategoryChange}
          />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={filters.sort === 'date_desc'}
            onChange={handleSortChange}
          />
          Sort by date (newest first)
        </label>
      </div>
    </div>
  );
}

export default Filters;