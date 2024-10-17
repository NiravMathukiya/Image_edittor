// ImageCanvas.jsx

import React, { useEffect, useRef, useState } from 'react';

const ImageCanvas = ({ image, filter, textOverlays, drawingMode, lineWidth, color }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false); // Track whether the user is drawing
  const [ctx, setCtx] = useState(null); // Store the 2D context for canvas

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

        // Apply filters and draw image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = filter;
        context.drawImage(img, 0, 0, img.width, img.height);

        // Draw text overlays
        textOverlays.forEach(({ text, x, y, fontSize = 20, fontColor = '#000' }) => {
          context.font = `${fontSize}px sans-serif`;
          context.fillStyle = fontColor;
          context.fillText(text, x, y);
        });

        // Save context to state
        setCtx(context);
      };
    }
  }, [image, filter, textOverlays]);

  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Draw on canvas
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return; // Only draw when the mouse is pressed
    const { offsetX, offsetY } = nativeEvent;

    if (drawingMode === 'eraser') {
      ctx.strokeStyle = '#ffffff'; // Use white color for eraser
    } else {
      ctx.strokeStyle = color; // Use selected color for drawing
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round'; // Round line caps for smoother lines
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="image-canvas-container flex justify-center">
      {image ? (
        <canvas
          ref={canvasRef}
          className="border border-gray-300"
          style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      ) : (
        <div className="placeholder w-full h-64 bg-gray-200 flex items-center justify-center">
          <p>No Image Uploaded</p>
        </div>
      )}
    </div>
  );
};

export default ImageCanvas;
