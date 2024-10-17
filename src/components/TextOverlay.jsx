// ImageCanvas.jsx

import React, { useEffect, useRef } from 'react';

const ImageCanvas = ({ image, filter, textOverlays, drawingMode, lineWidth, color }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Set canvas size to match the image
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Load the image
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      applyFilter();
      drawTextOverlays();
    };
  }, [image, filter, textOverlays]);

  const applyFilter = () => {
    const ctx = ctxRef.current;
    if (filter) {
      ctx.filter = filter;
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas before re-drawing
        ctx.drawImage(img, 0, 0);
        drawTextOverlays();
      };
    } else {
      ctx.filter = 'none'; // Reset filter if none is selected
    }
  };

  const drawTextOverlays = () => {
    const ctx = ctxRef.current;
    textOverlays.forEach((overlay) => {
      ctx.font = `${overlay.fontSize}px Arial`;
      ctx.fillStyle = overlay.color;
      ctx.fillText(overlay.text, 20, 50); // Adjust position as needed
    });
  };

  const startDrawing = (e) => {
    const ctx = ctxRef.current;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasRef.current.addEventListener('mousemove', draw);
    canvasRef.current.addEventListener('mouseup', stopDrawing);
    canvasRef.current.addEventListener('mouseleave', stopDrawing);
  };

  const draw = (e) => {
    const ctx = ctxRef.current;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', stopDrawing);
    canvas.removeEventListener('mouseleave', stopDrawing);
    ctxRef.current.closePath();
  };

  return (
    <div className="image-canvas" style={{ position: 'relative', width: '0%', height: '0%' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        style={{ border: '1px solid #000', width: '0%', height: '0%', display:"none" }}
      />
    </div>
  );
};

export default ImageCanvas;
