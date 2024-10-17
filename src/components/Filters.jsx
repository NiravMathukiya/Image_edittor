// Filters.jsx

import React from 'react';

const Filters = ({ setFilter }) => {
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="filters text-center mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Image Filters</h2>
      <div className="filter-buttons grid grid-cols-2 md:grid-cols-3 gap-4">
        <button 
          onClick={() => handleFilterChange('')} 
          className="filter-btn bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          None
        </button>
        <button 
          onClick={() => handleFilterChange('grayscale(100%)')} 
          className="filter-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          Grayscale
        </button>
        <button 
          onClick={() => handleFilterChange('sepia(100%)')} 
          className="filter-btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          Sepia
        </button>
        <button 
          onClick={() => handleFilterChange('invert(100%)')} 
          className="filter-btn bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          Invert
        </button>
        <button 
          onClick={() => handleFilterChange('brightness(150%)')} 
          className="filter-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          Brightness
        </button>
        <button 
          onClick={() => handleFilterChange('contrast(200%)')} 
          className="filter-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          Contrast
        </button>
      </div>
    </div>
  );
};

export default Filters;
