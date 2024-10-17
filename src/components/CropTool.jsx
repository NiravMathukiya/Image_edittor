import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg'; // Helper function to get the cropped image

const CropTool = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Called when cropping area changes
  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // Called when the zoom level changes
  const onZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  // Called when the user stops dragging the crop area, stores the cropped area data
  const onCropAreaComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Function to trigger cropping the image
  const handleCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage); // Pass the cropped image back to the parent
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onCropComplete]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="crop-container w-full h-64 relative">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}  // You can change aspect ratio as per your need
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
        />
      </div>
      {/* Zoom Control */}
      <div className="flex items-center mt-4 space-x-2">
        <label className="text-gray-700">Zoom:</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-32"
        />
      </div>
      {/* Crop Button */}
      <button
        onClick={handleCrop}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
      >
        Crop Image
      </button>
    </div>
  );
};

export default CropTool;
