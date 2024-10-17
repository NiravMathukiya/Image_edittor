// DrawingTools.jsx

import React, { useState } from 'react';

const DrawingTools = ({ setDrawingMode, setLineWidth, setColor }) => {
  const [selectedTool, setSelectedTool] = useState('pencil');

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    setDrawingMode(tool);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="drawing-tools bg-white shadow-lg p-6 rounded-lg mb-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Drawing Tools</h2>
      
      <div className="tool-options flex justify-between  gap-1 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
            ${selectedTool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          onClick={() => handleToolChange('pencil')}
        >
          🖉 Pencil
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
            ${selectedTool === 'brush' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          onClick={() => handleToolChange('brush')}
        >
          🎨 Brush
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
            ${selectedTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          onClick={() => handleToolChange('eraser')}
        >
          🧽 Eraser
        </button>
      </div>

      <div className="line-width mb-4">
        <label htmlFor="lineWidth" className="block text-lg font-semibold mb-2">Line Width:</label>
        <input
          type="range"
          id="lineWidth"
          min="1"
          max="10"
          onChange={handleLineWidthChange}
          className="w-full cursor-pointer"
        />
      </div>

      <div className="color-picker">
        <label htmlFor="color" className="block text-lg font-semibold mb-2">Color:</label>
        <input
          type="color"
          id="color"
          onChange={handleColorChange}
          defaultValue="#000000"
          className="w-full h-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DrawingTools;
