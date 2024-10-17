import React from 'react';

const Toolbar = ({ onRotate, onFlip, onZoom, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 bg-white shadow-md p-4 rounded-md">
      {/* Rotate Left Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => onRotate(-90)}
      >
        Rotate Left
      </button>

      {/* Rotate Right Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => onRotate(90)}
      >
        Rotate Right
      </button>

      {/* Flip Horizontal Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={() => onFlip('horizontal')}
      >
        Flip Horizontal
      </button>

      {/* Flip Vertical Button */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={() => onFlip('vertical')}
      >
        Flip Vertical
      </button>

      {/* Zoom Slider */}
      <div className="flex items-center">
        <label htmlFor="zoom" className="mr-2 text-gray-600">Zoom:</label>
        <input
          id="zoom"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          defaultValue="1"
          onChange={(e) => onZoom(parseFloat(e.target.value))}
          className="cursor-pointer"
        />
      </div>

      {/* Filter Selection */}
      <div className="flex items-center">
        <label htmlFor="filter" className="mr-2 text-gray-600">Filter:</label>
        <select
          id="filter"
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value="none">None</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="invert(100%)">Invert</option>
          <option value="contrast(200%)">High Contrast</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
