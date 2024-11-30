import React, { useEffect, useRef, useState } from 'react';

const ImageCanvas = ({ image, filter, textOverlays, drawingMode, lineWidth, color }) => {
  const canvasRef = useRef(null); // For the image canvas
  const drawingCanvasRef = useRef(null); // For the drawing canvas
  const [isDrawing, setIsDrawing] = useState(false); // Track whether the user is drawing
  const [drawingHistory, setDrawingHistory] = useState([]); // Stack for undo
  const [redoHistory, setRedoHistory] = useState([]); // Stack for redo

  useEffect(() => {
    // Set up the drawing context with willReadFrequently optimization
    if (drawingCanvasRef.current) {
      const drawingContext = drawingCanvasRef.current.getContext('2d', {
        willReadFrequently: true,
      });
      drawingContext.lineCap = 'round'; // Default line cap
      drawingContext.lineJoin = 'round'; // Default line join
    }
  }, []);

  // Load the image onto the canvas
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();

      img.src = image;
      img.onload = () => {
        // Set canvas dimensions based on image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = filter;
        context.drawImage(img, 0, 0, img.width, img.height);

        // Draw text overlays
        textOverlays.forEach(({ text, x, y, fontSize = 20, fontColor = '#000' }) => {
          context.font = `${fontSize}px sans-serif`;
          context.fillStyle = fontColor;
          context.fillText(text, x, y);
        });

        // Save the current state for undo
        saveDrawingState();
      };
    }
  }, [image, filter, textOverlays]);

  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const drawingContext = drawingCanvasRef.current.getContext('2d');
    drawingContext.beginPath();
    drawingContext.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Draw on canvas
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return; // Only draw when the mouse is pressed
    const { offsetX, offsetY } = nativeEvent;
    const drawingContext = drawingCanvasRef.current.getContext('2d');

    drawingContext.lineWidth = lineWidth; // Set line width for drawing

    if (drawingMode === 'eraser') {
      // Use a white rectangle to erase
      drawingContext.clearRect(offsetX - lineWidth / 2, offsetY - lineWidth / 2, lineWidth, lineWidth);
    } else {
      drawingContext.strokeStyle = color; // Use selected color for drawing
      drawingContext.lineTo(offsetX, offsetY);
      drawingContext.stroke();
    }
  };

  // Stop drawing
  const stopDrawing = () => {
    const drawingContext = drawingCanvasRef.current.getContext('2d');
    drawingContext.closePath();
    setIsDrawing(false);

    // Save the current state for undo after drawing
    saveDrawingState();
  };

  // Save the current drawing state for undo/redo functionality
  const saveDrawingState = () => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingContext = drawingCanvas.getContext('2d');
    
    // Create a new canvas to save the current state
    const currentState = drawingContext.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);

    // Add current state to drawing history
    setDrawingHistory((prev) => [...prev, currentState]);
    setRedoHistory([]); // Clear redo history on new action
  };

  // Undo last action
  const undo = () => {
    if (drawingHistory.length === 0) return; // No state to undo
    const lastState = drawingHistory[drawingHistory.length - 1]; // Get the last state
    setRedoHistory((prev) => [...prev, lastState]); // Push it to redo history

    // Restore to the last state
    const drawingCanvas = drawingCanvasRef.current;
    const drawingContext = drawingCanvas.getContext('2d');
    drawingContext.putImageData(lastState, 0, 0); // Restore the last state

    // Update drawing history without mutating the original array
    setDrawingHistory((prev) => prev.slice(0, -1)); // Remove the last state from history
  };

  // Redo last action
  const redo = () => {
    if (redoHistory.length === 0) return; // No state to redo
    const lastRedoState = redoHistory[redoHistory.length - 1]; // Get the last redo state
    setDrawingHistory((prev) => [...prev, lastRedoState]); // Push it back to drawing history

    // Restore to the last redo state
    const drawingCanvas = drawingCanvasRef.current;
    const drawingContext = drawingCanvas.getContext('2d');
    drawingContext.putImageData(lastRedoState, 0, 0); // Restore the redo state

    // Update redo history without mutating the original array
    setRedoHistory((prev) => prev.slice(0, -1)); // Remove the last redo state
  };

  // Download edited image
  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      context.drawImage(img, 0, 0);
      // Draw the drawn content
      const drawingCanvas = drawingCanvasRef.current;
      context.drawImage(drawingCanvas, 0, 0);

      // Create a download link
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'edited_image.png';
      link.click();
    };
  };

  return (
    <div className="image-canvas-container flex flex-col items-center">
      {image ? (
        <div className="relative w-full max-w-lg">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 shadow-lg rounded-lg"
            style={{ height: '550px', width: '100%', marginBottom: '-6px' }}
          />
          <canvas
            ref={drawingCanvasRef}
            className="absolute top-0 left-0 border border-gray-300 shadow-lg rounded-lg"
            style={{ height: '550px', width: '100%' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      ) : (
        <p className="text-gray-500 text-center">Upload an image to start editing.</p>
      )}
      <div className="mt-4 flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={undo}
        >
          Undo
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={redo}
        >
          Redo
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageCanvas;
