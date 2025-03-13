'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ImageCropper = () => {
  const [imageFile, setImageFile] = useState(null); // Selected image file
  const [croppedImage, setCroppedImage] = useState(null); // Cropped image URL
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 }); // Crop area dimensions
  const canvasRef = useRef(null); // Reference to the canvas element

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageFile;

    img.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(img, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height);
      const croppedDataUrl = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedDataUrl);
    };
  };

  const handleDownload = () => {
    if (!croppedImage) return;

    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = 'cropped_image.jpg'; // Set the default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Image Cropper
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {imageFile && (
            <div className="mb-6">
              <img src={imageFile} alt="Preview" className="mb-4" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Area (x, y, width, height)
                </label>
                <input
                  type="number"
                  placeholder="X"
                  onChange={(e) => setCropArea({ ...cropArea, x: parseInt(e.target.value) })}
                  className="mr-2 border border-gray-300 rounded-md p-1"
                />
                <input
                  type="number"
                  placeholder="Y"
                  onChange={(e) => setCropArea({ ...cropArea, y: parseInt(e.target.value) })}
                  className="mr-2 border border-gray-300 rounded-md p-1"
                />
                <input
                  type="number"
                  placeholder="Width"
                  onChange={(e) => setCropArea({ ...cropArea, width: parseInt(e.target.value) })}
                  className="mr-2 border border-gray-300 rounded-md p-1"
                />
                <input
                  type="number"
                  placeholder="Height"
                  onChange={(e) => setCropArea({ ...cropArea, height: parseInt(e.target.value) })}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleCrop}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Crop Image
          </button>

          {croppedImage && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Cropped Image</h2>
              <img src={croppedImage} alt="Cropped" className="mb-4" />
              <button
                onClick={handleDownload}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Download Cropped Image
              </button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ImageCropper;
