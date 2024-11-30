// App.jsx

import React, { useState } from 'react';
import ImageCanvas from './components/ImageCanvas';
import Filters from './components/Filters';
import TextOverlay from './components/TextOverlay';
import DrawingTools from './components/DrawingTool'; // Import your drawing tools component

const App = () => {
  const [image, setImage] = useState(null); // Start with no image
  const [filter, setFilter] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [drawingMode, setDrawingMode] = useState('pencil');
  const [lineWidth, setLineWidth] = useState(1);
  const [color, setColor] = useState('#000000');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  const addText = (newText) => {
    setTextOverlays((prev) => [...prev, newText]);
  };

  return (
    <div className="app">
      <h1 className="text-center text-3xl font-bold my-6">Image Editor</h1>

      {/* Flexbox for Image and Tools */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mx-auto max-w-7xl px-4">

        {/* Left side - Image and Filters */}
        <div className="w-full md:w-3/4 ">
          <div className='grid w-full place-items-center justify-center items-center '>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={`upload-button ${image ? 'hidden' : ''} mb-4 w-full px-4 py-2 border rounded-lg cursor-pointer text-center bg-blue-500 text-white hover:bg-blue-600 place-content-center place-items-center `}
            />
          </div>
          <ImageCanvas
            image={image}
            filter={filter}
            textOverlays={textOverlays}
            drawingMode={drawingMode}
            lineWidth={lineWidth}
            color={color}
          />
          <Filters setFilter={setFilter} />
          <TextOverlay addText={addText} />
        </div>

        {/* Right side - Drawing Tools */}
          <div className="w-full md:w-1/4">
            <DrawingTools
              setDrawingMode={setDrawingMode}
              setLineWidth={setLineWidth}
              setColor={setColor}
            />
          </div>
      </div>
    </div>
  );
};

export default App;
