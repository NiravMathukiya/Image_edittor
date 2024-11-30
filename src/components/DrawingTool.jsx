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
    <div className="drawing-tools bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Drawing Tools</h2>
      <div className="flex space-x-4 mb-4">
        {['pencil', 'brush', 'eraser'].map((tool) => (
          <button
            key={tool}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
              ${selectedTool === tool ? 'bg-blue-500 text-white border-2 border-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            onClick={() => handleToolChange(tool)}
          >
            {tool === 'pencil' ? '🖉 Pencil' : tool === 'brush' ? '🎨 Brush' : '🧽 Eraser'}
          </button>
        ))}
      </div>

      <div className="line-width mb-4">
        <label htmlFor="lineWidth" className="block mb-2">Line Width: {lineWidth}</label>
        <input
          type="range"
          id="lineWidth"
          min="1"
          max="10"
          onChange={handleLineWidthChange}
          className="w-full"
        />
      </div>

      <div className="color-picker mb-4">
        <label htmlFor="color" className="block mb-2">Color:</label>
        <input
          type="color"
          id="color"
          onChange={handleColorChange}
          defaultValue="#000000"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DrawingTools;
