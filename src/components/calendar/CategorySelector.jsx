import React from 'react';
import './CategorySelector.css';

function CategorySelector({ onCategoryChange }) {
  // Sample categories
  const categories = [
    { id: 1, name: 'Work', color: '#4CAF50' },
    { id: 2, name: 'Personal', color: '#2196F3' },
    { id: 3, name: 'Study', color: '#9C27B0' },
    { id: 4, name: 'Exercise', color: '#FF9800' },
    { id: 5, name: 'Meeting', color: '#F44336' }
  ];

  return (
    <div className="category-selector">
      <h3>Categories</h3>
      {categories.map(category => (
        <div key={category.id} className="category-item">
          <input
            type="checkbox"
            id={`category-${category.id}`}
            onChange={(e) => onCategoryChange(category.id, e.target.checked)}
          />
          <label 
            htmlFor={`category-${category.id}`}
            style={{ '--category-color': category.color }}
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
