// components/tabs/OcrTab.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export function OcrTab (){
  const [ocrImage, setOcrImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOcrUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      setOcrImage(URL.createObjectURL(file));
      
      // Simulate OCR processing
      setTimeout(() => {
        setIsProcessing(false);
        // Mock OCR result
        alert('Vaccination card processed successfully!\n\nExtracted Information:\n- Name: John Doe\n- Vaccine: COVID-19 Pfizer\n- Dose: 1/2\n- Date: 2024-01-07\n- Center: Dhaka Medical College');
      }, 2000);
    }
  };

  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }} 
      className="bg-white rounded-2xl p-8 shadow-lg"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vaccination Card OCR Scanner</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a photo of a vaccination card to automatically extract and record vaccination information
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
          {ocrImage ? (
            <div className="space-y-4">
              <img 
                src={ocrImage} 
                alt="Uploaded vaccination card" 
                className="max-w-full h-64 object-contain mx-auto rounded-lg"
              />
              {isProcessing ? (
                <div className="text-blue-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p>Processing vaccination card...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-green-600 font-semibold">✓ Card processed successfully</p>
                  <button 
                    onClick={() => setOcrImage(null)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Scan Another Card
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Upload vaccination card image</p>
              <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Choose File
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleOcrUpload}
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">Supports: JPG, PNG, PDF</p>
            </>
          )}
        </div>

        {/* OCR Instructions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p className="text-sm font-medium">Take clear photo</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p className="text-sm font-medium">Upload image</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p className="text-sm font-medium">Auto-extract data</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

